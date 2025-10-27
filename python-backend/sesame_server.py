"""
Sesame CSM Voice Cloning Server
Flask API that runs Sesame CSM-1B model for voice cloning
"""

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import torch
from transformers import CsmForConditionalGeneration, AutoProcessor
import io
import tempfile
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Load model on startup
print("Loading Sesame CSM-1B model...")
model_id = "sesame/csm-1b"
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

processor = AutoProcessor.from_pretrained(model_id)
model = CsmForConditionalGeneration.from_pretrained(
    model_id, 
    device_map=device,
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
)
print("Model loaded successfully!")

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model": model_id,
        "device": device
    })

@app.route('/clone-voice', methods=['POST'])
def clone_voice():
    """
    Clone voice from audio sample
    
    Expects:
    - audio: Audio file (WebM, WAV, MP3)
    - text: Text to generate in cloned voice
    
    Returns:
    - WAV audio file with cloned voice
    """
    try:
        # Get audio file and text
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files['audio']
        text = request.form.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        print(f"Received request - Audio: {audio_file.filename}, Text length: {len(text)}")
        
        # Save uploaded audio temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as temp_audio:
            audio_file.save(temp_audio.name)
            temp_audio_path = temp_audio.name
        
        try:
            # Load and process audio
            # Note: You may need to convert WebM to WAV first using ffmpeg
            # For now, we'll use a simple approach
            
            # Prepare conversation format
            conversation = [
                {
                    "role": "0",
                    "content": [
                        {"type": "text", "text": "Sample audio"},
                        {"type": "audio", "path": temp_audio_path}
                    ]
                },
                {
                    "role": "0",
                    "content": [
                        {"type": "text", "text": text}
                    ]
                }
            ]
            
            # Process with Sesame
            print("Processing with Sesame CSM...")
            inputs = processor.apply_chat_template(
                conversation,
                tokenize=True,
                return_dict=True,
            ).to(device)
            
            # Generate audio
            print("Generating cloned voice...")
            with torch.no_grad():
                audio_output = model.generate(**inputs, output_audio=True)
            
            # Save generated audio
            with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_output:
                processor.save_audio(audio_output, temp_output.name)
                output_path = temp_output.name
            
            print("Voice cloning complete!")
            
            # Send file
            return send_file(
                output_path,
                mimetype='audio/wav',
                as_attachment=True,
                download_name='voice-clone.wav'
            )
            
        finally:
            # Cleanup temp files
            if os.path.exists(temp_audio_path):
                os.unlink(temp_audio_path)
            
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": "Failed to clone voice",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("Sesame CSM Voice Cloning Server")
    print("="*50)
    print(f"Model: {model_id}")
    print(f"Device: {device}")
    print("Server starting on http://localhost:5000")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
