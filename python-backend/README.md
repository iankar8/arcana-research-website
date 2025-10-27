# Sesame CSM Python Backend

This is a Python Flask server that runs the Sesame CSM-1B model for real voice cloning.

## Why Python Backend?

The Hugging Face Inference API doesn't support the full conversational format that Sesame CSM requires. To use real voice cloning, you need to run the model directly with Python and the `transformers` library.

## Requirements

- Python 3.9+
- CUDA-capable GPU (8GB+ VRAM recommended)
- Or CPU (slower, but works)

## Setup

### 1. Create Virtual Environment

```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Accept Model Access

Go to https://huggingface.co/sesame/csm-1b and accept the terms.

### 4. Login to Hugging Face

```bash
pip install huggingface_hub
huggingface-cli login
```

Enter your HF token when prompted.

### 5. Run Server

```bash
python sesame_server.py
```

The server will start on `http://localhost:5000`

## Update Next.js API

Edit `/app/api/voice-clone/route.ts` to point to your Python backend:

```typescript
// Instead of HF Inference API, call local Python server
const response = await fetch("http://localhost:5000/clone-voice", {
  method: "POST",
  body: formData,  // Send the same formData
});
```

## Endpoints

### `GET /health`
Health check

**Response:**
```json
{
  "status": "healthy",
  "model": "sesame/csm-1b",
  "device": "cuda"
}
```

### `POST /clone-voice`
Clone voice from audio sample

**Request:**
- `audio`: Audio file (multipart/form-data)
- `text`: Text to generate

**Response:**
- WAV audio file with cloned voice

## Production Deployment

### Option 1: Docker

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY sesame_server.py .

CMD ["python", "sesame_server.py"]
```

### Option 2: Railway/Render

1. Push to GitHub
2. Connect to Railway/Render
3. Add environment variables
4. Deploy

### Option 3: AWS/GCP with GPU

For best performance, deploy on GPU instance:
- AWS: g4dn.xlarge ($0.526/hour)
- GCP: n1-standard-4 + T4 GPU ($0.35/hour)

## Cost Estimates

### Self-Hosted
- **GPU Instance**: $100-500/month
- **Bandwidth**: ~$10/month
- **Total**: $110-510/month

### Serverless (Modal, Banana)
- **Per request**: $0.001-0.01
- **1000 requests**: $1-10
- **Good for**: Low-medium volume

## Troubleshooting

### "CUDA out of memory"
- Reduce batch size
- Use CPU instead
- Get GPU with more VRAM

### "Model not found"
- Run `huggingface-cli login`
- Accept model access on HF website

### "Audio format not supported"
- Install ffmpeg: `brew install ffmpeg`
- Server will auto-convert formats

## Performance

- **GPU (T4)**: ~5-10 seconds per clone
- **GPU (A100)**: ~2-3 seconds per clone
- **CPU**: ~30-60 seconds per clone

## Security

- Add API key authentication
- Rate limiting
- HTTPS in production
- Don't expose publicly without auth
