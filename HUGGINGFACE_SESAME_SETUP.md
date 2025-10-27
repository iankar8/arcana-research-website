# Sesame CSM Voice Cloning Setup (Hugging Face)

## 🎯 Quick Setup

You have access to Sesame CSM-1B on Hugging Face! Here's how to integrate it:

### **Step 1: Get Your Hugging Face Token**

1. Go to https://huggingface.co/settings/tokens
2. Create a new token (or use existing)
3. Copy the token

### **Step 2: Accept Model Access**

1. Go to https://huggingface.co/sesame/csm-1b
2. Click "Agree and access repository"
3. Fill out the form if required

### **Step 3: Add Environment Variable**

Create or update `.env.local`:

```bash
HUGGINGFACE_API_TOKEN=hf_your_token_here
```

### **Step 4: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### **Step 5: Test**

1. Go to http://localhost:3002/ai-demos
2. Record your voice
3. Click "Generate Voice Clone"
4. Wait 20-30 seconds (first time model loads)
5. Hear your cloned voice!

---

## 🔧 How It Works

### **Architecture**

```
Browser (User Records) 
    ↓ WebM audio
Next.js API Route (/api/voice-clone)
    ↓ Audio + Text
Hugging Face Inference API
    ↓ Sesame CSM-1B Model
Generated Audio (WAV)
    ↓
Browser (Playback)
```

### **API Flow**

1. **User records voice** (30-60 seconds)
2. **Frontend sends** audio blob + text to `/api/voice-clone`
3. **Backend converts** WebM to format Sesame expects
4. **Calls Hugging Face** Inference API with conversation format:
   ```json
   [
     {
       "role": "0",
       "content": [
         { "type": "audio", "audio": [audio_array] }
       ]
     },
     {
       "role": "0", 
       "content": [
         { "type": "text", "text": "Banking script..." }
       ]
     }
   ]
   ```
5. **Sesame CSM generates** cloned voice
6. **Returns audio** to frontend
7. **User hears** their voice speaking new content

---

## ⚠️ Important Notes

### **Model Loading Time**

- **First request**: 20-30 seconds (model loads into memory)
- **Subsequent requests**: 5-10 seconds
- The API returns 503 status while loading
- Frontend shows helpful message to user

### **Audio Format Requirements**

Sesame CSM expects:
- **Sample rate**: 24kHz
- **Format**: WAV or raw audio array
- **Duration**: 3-60 seconds recommended

Browser records in WebM - the API handles conversion.

### **Rate Limits (Hugging Face Free Tier)**

- **Requests**: ~1000/month
- **Concurrent**: Limited
- **Model loading**: Happens after 15 min of inactivity

For production, consider:
- Hugging Face Pro ($9/month) - faster, more requests
- Dedicated Inference Endpoint ($60-600/month) - always warm

---

## 🐛 Troubleshooting

### **"Model is loading" Error**

**Cause**: Model was idle, needs to warm up  
**Solution**: Wait 20-30 seconds, try again  
**Prevention**: Keep model warm with periodic requests

### **"Unauthorized" Error**

**Cause**: Invalid or missing HF token  
**Solution**: 
1. Check token in `.env.local`
2. Verify token has access to sesame/csm-1b
3. Restart dev server

### **Audio Not Playing**

**Cause**: Browser codec support  
**Solution**: 
- Check browser console for errors
- Try different browser (Chrome recommended)
- Verify audio file downloaded correctly

### **Poor Voice Quality**

**Cause**: Short or noisy recording  
**Solution**:
- Record for full 30-60 seconds
- Use quiet environment
- Speak clearly and naturally
- Provide more context audio

---

## 🚀 Production Deployment

### **Option 1: Hugging Face Inference API** (Current)

**Pros:**
- No infrastructure needed
- Easy setup
- Pay per use

**Cons:**
- Cold starts (20-30s first request)
- Rate limits on free tier
- Shared infrastructure

**Cost**: $0-9/month (free tier or Pro)

### **Option 2: Dedicated Inference Endpoint**

For high-volume production:

1. Go to https://ui.endpoints.huggingface.co/
2. Create endpoint for `sesame/csm-1b`
3. Choose GPU (T4, A10G, or A100)
4. Update API endpoint in code
5. Always warm, faster responses

**Cost**: $60-600/month depending on GPU

### **Option 3: Self-Hosted**

Run Sesame on your own infrastructure:

```python
# requirements.txt
torch
transformers
datasets

# server.py
from transformers import CsmForConditionalGeneration, AutoProcessor
import torch

model_id = "sesame/csm-1b"
device = "cuda" if torch.cuda.is_available() else "cpu"

processor = AutoProcessor.from_pretrained(model_id)
model = CsmForConditionalGeneration.from_pretrained(
    model_id, 
    device_map=device
)

# Flask/FastAPI endpoint here
```

**Requirements:**
- GPU with 8GB+ VRAM (T4 minimum)
- Python 3.9+
- CUDA toolkit

**Cost**: $100-500/month for GPU instance

---

## 📊 Audio Processing Details

### **Browser Recording → Sesame Format**

The API handles this conversion:

```typescript
// 1. Browser records WebM
const mediaRecorder = new MediaRecorder(stream);

// 2. API receives WebM blob
const audioFile = formData.get("audio") as File;

// 3. Convert to Float32Array
const audioBuffer = await audioFile.arrayBuffer();
const audioArray = new Float32Array(audioBuffer);

// 4. Send to Sesame in conversation format
const conversation = [
  {
    role: "0",
    content: [
      { type: "audio", audio: Array.from(audioArray) }
    ]
  },
  {
    role: "0",
    content: [
      { type: "text", text: "Script to generate..." }
    ]
  }
];
```

### **Improving Audio Quality**

For better results, you can:

1. **Resample to 24kHz** before sending
2. **Normalize audio levels**
3. **Remove silence** from start/end
4. **Apply noise reduction**

Example with Web Audio API:

```typescript
const audioContext = new AudioContext({ sampleRate: 24000 });
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
const channelData = audioBuffer.getChannelData(0);
// Now channelData is at 24kHz
```

---

## 🎛️ Advanced Configuration

### **Adjust Generation Parameters**

Edit `/app/api/voice-clone/route.ts`:

```typescript
body: JSON.stringify({
  inputs: conversation,
  parameters: {
    max_new_tokens: 1000,      // Longer = more audio
    temperature: 0.7,           // Lower = more consistent
    top_p: 0.9,                 // Nucleus sampling
    repetition_penalty: 1.1,    // Reduce repetition
  },
}),
```

### **Batch Processing**

Process multiple voice clones:

```typescript
const conversations = [
  [/* conversation 1 */],
  [/* conversation 2 */],
];

const response = await fetch(
  "https://api-inference.huggingface.co/models/sesame/csm-1b",
  {
    method: "POST",
    headers: { /* ... */ },
    body: JSON.stringify({
      inputs: conversations,  // Array of conversations
    }),
  }
);
```

### **Add Context for Better Quality**

Sesame works better with conversational context:

```typescript
const conversation = [
  // Context turn 1
  {
    role: "0",
    content: [
      { type: "text", text: "Hello, how are you?" },
      { type: "audio", audio: contextAudio1 }
    ]
  },
  // Context turn 2
  {
    role: "0",
    content: [
      { type: "text", text: "I'm doing great!" },
      { type: "audio", audio: contextAudio2 }
    ]
  },
  // Generation turn (no audio = generate it)
  {
    role: "0",
    content: [
      { type: "text", text: "Welcome to the bank..." }
    ]
  }
];
```

---

## 💰 Cost Estimates

### **Development/Testing**
- **HF Free Tier**: $0/month
- **Requests**: ~100-200/month
- **Total**: **$0**

### **Production (Low Volume)**
- **HF Pro**: $9/month
- **Requests**: ~1,000/month
- **Total**: **$9/month**

### **Production (High Volume)**
- **Dedicated Endpoint (T4)**: $60/month
- **Requests**: Unlimited
- **Always warm**: No cold starts
- **Total**: **$60/month**

### **Enterprise**
- **Dedicated Endpoint (A100)**: $600/month
- **Fastest inference**: <2 seconds
- **Highest quality**: Best results
- **Total**: **$600/month**

---

## 🔐 Security Best Practices

### **Environment Variables**

```bash
# .env.local (NEVER commit this)
HUGGINGFACE_API_TOKEN=hf_xxxxx

# .env.example (commit this)
HUGGINGFACE_API_TOKEN=your_token_here
```

### **Rate Limiting**

Add to API route:

```typescript
// Simple in-memory rate limit
const requestCounts = new Map<string, number>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const count = requestCounts.get(ip) ?? 0;
  
  if (count > 10) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }
  
  requestCounts.set(ip, count + 1);
  
  // Reset after 1 hour
  setTimeout(() => requestCounts.delete(ip), 3600000);
  
  // ... rest of code
}
```

### **Audio Storage**

Currently audio is NOT stored. If you want to save recordings:

```typescript
// Use Supabase Storage
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Upload audio
const { data, error } = await supabase.storage
  .from('voice-recordings')
  .upload(`${userId}/${Date.now()}.webm`, audioBlob);
```

---

## 📈 Monitoring

### **Track API Usage**

```typescript
// Log to console or analytics
console.log({
  timestamp: new Date().toISOString(),
  model: "sesame/csm-1b",
  duration: Date.now() - startTime,
  success: true,
});
```

### **Monitor Costs**

Check Hugging Face dashboard:
- https://huggingface.co/settings/billing

### **Error Tracking**

Integrate Sentry or similar:

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // ... API call
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

---

## 🧪 Testing

### **Test with cURL**

```bash
curl -X POST http://localhost:3002/api/voice-clone \
  -H "Content-Type: multipart/form-data" \
  -F "audio=@recording.webm" \
  -F "text=Hello from Sesame" \
  --output cloned.wav
```

### **Test Hugging Face API Directly**

```bash
curl https://api-inference.huggingface.co/models/sesame/csm-1b \
  -H "Authorization: Bearer hf_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{"inputs": [{"role": "0", "content": [{"type": "text", "text": "Hello"}]}]}'
```

---

## 📚 Resources

- **Sesame Model**: https://huggingface.co/sesame/csm-1b
- **HF Inference API Docs**: https://huggingface.co/docs/api-inference/
- **Transformers Docs**: https://huggingface.co/docs/transformers/
- **Sesame Space Demo**: https://huggingface.co/spaces/sesame/csm-1b

---

## ✅ Checklist

Before going live:

- [ ] HF token added to `.env.local`
- [ ] Model access accepted on HF
- [ ] Tested voice recording
- [ ] Tested voice cloning
- [ ] Lead capture working
- [ ] Error handling tested
- [ ] Rate limiting added
- [ ] Analytics tracking added
- [ ] Production HF token created
- [ ] Environment variables set in Vercel
- [ ] Monitoring setup
- [ ] Cost alerts configured

---

**Ready to test!** Add your HF token and try it out at `/ai-demos`
