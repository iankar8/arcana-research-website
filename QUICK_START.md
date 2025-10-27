# 🚀 Voice Cloning Demo - Quick Start

## ✅ What's Already Done

Your voice cloning demo is **live and working** at `/ai-demos`!

- ✅ Voice recording with browser microphone
- ✅ Beautiful UI with animations
- ✅ Lead capture modal
- ✅ Banking use cases section
- ✅ Mobile responsive
- ✅ Simulated voice cloning (for testing)

---

## 🔑 Enable Real Voice Cloning (5 minutes)

### **Step 1: Get Hugging Face Token**

1. Go to: https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it "Arcana Demos"
4. Copy the token (starts with `hf_`)

### **Step 2: Accept Model Access**

1. Go to: https://huggingface.co/sesame/csm-1b
2. Click "Agree and access repository"
3. Fill out form if required

### **Step 3: Add Token to Project**

Create `.env.local` in project root:

```bash
HUGGINGFACE_API_TOKEN=hf_paste_your_token_here
```

### **Step 4: Restart Server**

```bash
# Stop current server (Ctrl+C in terminal)
npm run dev
```

### **Step 5: Test It!**

1. Go to http://localhost:3002/ai-demos
2. Click "Start Recording"
3. Read the script for 30-60 seconds
4. Click "Stop Recording"
5. Click "Generate Voice Clone"
6. Wait 20-30 seconds (first time only)
7. Hear your cloned voice! 🎉

---

## 📊 What Happens

1. **You record** your voice in the browser
2. **Audio is sent** to your Next.js API
3. **API calls** Hugging Face with Sesame CSM-1B
4. **Sesame clones** your voice speaking new text
5. **You hear** the result instantly

---

## ⚠️ First-Time Notes

- **First request takes 20-30 seconds** (model loads)
- **After that, 5-10 seconds** per clone
- **Model sleeps after 15 min** of inactivity
- **Free tier: ~1000 requests/month**

---

## 🎯 Next Steps

### **For Testing**
- ✅ You're ready! Just add the HF token above

### **For Production**
1. Set up lead capture with Supabase (optional)
2. Add analytics tracking
3. Deploy to Vercel
4. Add HF token to Vercel environment variables

### **For Scale**
- Consider HF Pro ($9/month) for faster responses
- Or Dedicated Endpoint ($60+/month) for always-warm model

---

## 📚 Documentation

- **Detailed Sesame Setup**: `HUGGINGFACE_SESAME_SETUP.md`
- **Full Demo Guide**: `AI_DEMOS_SETUP.md`
- **Environment Example**: `.env.example`

---

## 🆘 Troubleshooting

### **"Model is loading" message?**
→ Wait 20-30 seconds, try again (first time only)

### **"Unauthorized" error?**
→ Check your HF token in `.env.local`
→ Make sure you accepted model access

### **Audio not playing?**
→ Try Chrome browser
→ Check browser console for errors

### **Still not working?**
→ Check `HUGGINGFACE_SESAME_SETUP.md` for detailed troubleshooting

---

## 💡 Demo Features

**Voice Cloning:**
- Real-time recording with timer
- Visual feedback and animations
- Download cloned audio
- Professional banking script

**Lead Capture:**
- Auto-opens after demo completion
- Captures: name, email, company, title, interest
- Success animation
- Ready for Supabase integration

**Banking Context:**
- 4 use cases (IVR, training, notifications, exec comms)
- Professional CTA section
- Mobile-responsive design
- Matches Arcana brand

---

**🎉 That's it! Add your HF token and you're live!**

Questions? Check the detailed docs or test at `/ai-demos`
