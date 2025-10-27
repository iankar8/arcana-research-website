# Using Sesame Space API (Easiest Real Cloning)

## ✅ What I Just Set Up

Your API now calls **Sesame's official Hugging Face Space** for real voice cloning!

No need to:
- ❌ Clone the model repository (25GB+)
- ❌ Set up Python backend
- ❌ Manage GPU infrastructure
- ❌ Install dependencies

Just:
- ✅ Add your HF token
- ✅ Call their Space API
- ✅ Get real voice cloning!

---

## 🚀 Quick Setup (2 minutes)

### **Step 1: Get HF Token**

1. Go to: https://huggingface.co/settings/tokens
2. Create new token (or use existing)
3. Copy it

### **Step 2: Accept Model Access**

1. Go to: https://huggingface.co/sesame/csm-1b
2. Click "Agree and access repository"

### **Step 3: Add Token**

In your `.env.local`:

```bash
HUGGINGFACE_API_TOKEN=hf_your_token_here
```

### **Step 4: Restart & Test**

```bash
npm run dev
# Go to http://localhost:3000/ai-demos
# Record voice → Generate → Real cloning! 🎉
```

---

## 🎯 How It Works

```
Your Demo (Browser)
    ↓
Next.js API (/api/voice-clone)
    ↓
Sesame Space API (https://sesame-csm-1b.hf.space)
    ↓
Real Voice Cloning
    ↓
Generated Audio
    ↓
Your Demo (Playback)
```

**Benefits:**
- ✅ Real Sesame CSM voice cloning
- ✅ No infrastructure to manage
- ✅ Sesame handles GPU/scaling
- ✅ Free tier available
- ✅ Automatic fallback to simulation if Space is down

---

## 💰 Cost

### **Free Tier**
- **Requests**: Limited (depends on Space availability)
- **Cost**: $0
- **Speed**: May have cold starts

### **If You Need More**
You can duplicate their Space to your own account:
1. Go to: https://huggingface.co/spaces/sesame/csm-1b
2. Click "⋮" → "Duplicate this Space"
3. Choose GPU tier (free CPU or paid GPU)
4. Update API endpoint to your Space URL

**Your Space Costs:**
- **CPU (free)**: Slow but works
- **T4 GPU ($0.60/hr)**: Fast, ~$432/month if always on
- **A10G GPU ($3.15/hr)**: Fastest, ~$2,268/month

**Pro Tip:** Use "Zero GPU" (runs on-demand, free for personal use)

---

## ⚠️ Important Notes

### **First Request**
- Space may take 20-30 seconds to wake up
- API has automatic fallback to simulation
- Subsequent requests are faster

### **Rate Limits**
- Shared Space has rate limits
- For production, duplicate to your own Space
- Or use Python backend for unlimited requests

### **Space Availability**
- Public Space may be busy
- API gracefully falls back to simulation
- Consider duplicating for guaranteed availability

---

## 🔧 Troubleshooting

### **"Space is warming up" message**
→ Normal! Wait 20-30 seconds, try again  
→ Or use simulation while it loads

### **"Real cloning unavailable"**
→ Space might be down or rate limited  
→ Simulation kicks in automatically  
→ Try again in a few minutes

### **Want guaranteed uptime?**
→ Duplicate the Space to your account  
→ Or use Python backend (see `/python-backend/`)

---

## 🎛️ Advanced: Duplicate Space

For production with guaranteed availability:

### **1. Duplicate Space**
```bash
# Visit: https://huggingface.co/spaces/sesame/csm-1b
# Click: "⋮" → "Duplicate this Space"
# Name it: your-username/voice-cloning
# Choose: Zero GPU (free) or T4 GPU (paid)
```

### **2. Update API Endpoint**

Edit `/app/api/voice-clone/route.ts`:

```typescript
const response = await fetch(
  "https://your-username-voice-cloning.hf.space/api/predict",
  // ... rest of code
);
```

### **3. Benefits**
- ✅ Your own Space
- ✅ No rate limits from others
- ✅ Guaranteed availability
- ✅ Can customize the code

---

## 📊 Comparison

| Approach | Cost | Setup | Control | Speed |
|----------|------|-------|---------|-------|
| **Sesame's Space** | Free | 2 min | None | Good |
| **Your Space (Zero GPU)** | Free | 10 min | Some | Good |
| **Your Space (T4 GPU)** | $432/mo | 10 min | Full | Fast |
| **Python Backend** | $100-500/mo | 60 min | Full | Fastest |

---

## ✅ Current Status

Your demo is **ready to use real voice cloning**!

**Without HF Token:**
- ✅ Works with simulation
- ✅ Perfect for testing

**With HF Token:**
- ✅ Calls Sesame Space API
- ✅ Real voice cloning
- ✅ Automatic fallback if Space is busy
- ✅ Production-ready!

---

## 🎬 Next Steps

1. **Add HF token** to `.env.local`
2. **Restart server**: `npm run dev`
3. **Test at**: `/ai-demos`
4. **Record & clone** your voice!

If you need guaranteed uptime for production, duplicate the Space to your account.

---

**That's it! Real voice cloning in 2 minutes.** 🚀
