# AI Demos Setup Guide

## Overview
The AI Demos page (`/ai-demos`) showcases voice cloning technology for banking executives. This guide covers setup, API integration, and deployment.

---

## 🚀 Quick Start

The demo is **already functional** with simulated responses. To enable real voice cloning:

1. Get a Sesame API key (or alternative voice cloning provider)
2. Add API key to environment variables
3. Uncomment the API integration code
4. Test and deploy

---

## 📁 File Structure

```
/app/ai-demos/
  └── page.tsx                    # Main demo page
/components/
  ├── VoiceCloningDemo.tsx        # Voice cloning component
  └── LeadCaptureModal.tsx        # Lead capture form
/app/api/voice-clone/
  └── route.ts                    # API endpoint for voice cloning
```

---

## 🔑 Sesame API Integration

### Step 1: Get API Access

**Option A: Sesame (Recommended)**
- Website: https://sesame.com
- Sign up for API access
- Pricing: ~$50-200/month depending on usage

**Option B: ElevenLabs**
- Website: https://elevenlabs.io
- More established, higher quality
- Pricing: $5-99/month

**Option C: Play.ht**
- Website: https://play.ht
- Good alternative
- Pricing: $19-99/month

### Step 2: Configure Environment Variables

Create or update `.env.local`:

```bash
# Voice Cloning API
SESAME_API_KEY=your_api_key_here

# Optional: Lead capture integration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### Step 3: Update API Route

Edit `/app/api/voice-clone/route.ts`:

1. Uncomment the Sesame API implementation (lines 30-75)
2. Update the API endpoint URLs to match your provider
3. Adjust parameters (stability, similarity_boost) as needed
4. Test with a sample recording

### Step 4: Update Voice Cloning Component

Edit `/components/VoiceCloningDemo.tsx`:

Find the `generateClone` function (around line 95) and update:

```typescript
const generateClone = async () => {
  if (!audioBlob) return;

  setStage("generating");
  setError(null);

  try {
    // Create form data
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("text", sampleScript);

    // Call your API endpoint
    const response = await fetch("/api/voice-clone", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to generate voice clone");
    }

    // Handle response based on your API
    const data = await response.json();
    
    // If API returns audio URL
    if (data.audioUrl) {
      setClonedAudioUrl(data.audioUrl);
    }
    
    // If API returns audio blob
    if (response.headers.get("content-type")?.includes("audio")) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setClonedAudioUrl(url);
    }

    setStage("complete");
    onComplete();
  } catch (err) {
    setError("Failed to generate voice clone. Please try again.");
    setStage("processing");
    console.error("Error generating clone:", err);
  }
};
```

---

## 📊 Lead Capture Integration

### Option 1: Supabase (Recommended)

1. Create a Supabase project at https://supabase.com
2. Create a `leads` table:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  phone TEXT,
  interest TEXT NOT NULL,
  completed_demo BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'ai-demos'
);

-- Add RLS policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);
```

3. Update `/components/LeadCaptureModal.tsx`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { error } = await supabase
      .from('leads')
      .insert([{
        ...formData,
        completed_demo: hasCompletedDemo,
        source: 'ai-demos'
      }]);

    if (error) throw error;

    setIsSubmitted(true);
    // ... rest of success handling
  } catch (error) {
    console.error("Error submitting form:", error);
    setError("Failed to submit. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 2: HubSpot

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/hubspot-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        completed_demo: hasCompletedDemo,
      }),
    });

    if (!response.ok) throw new Error('Failed to submit');

    setIsSubmitted(true);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 3: Email Notification

Create `/app/api/send-lead/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Send email using SendGrid, Resend, or similar
  // Example with Resend:
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'demos@arcanaadvisors.com',
      to: 'sales@arcanaadvisors.com',
      subject: 'New AI Demo Lead',
      html: `
        <h2>New Lead from AI Demos</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Interest:</strong> ${data.interest}</p>
        <p><strong>Completed Demo:</strong> ${data.completed_demo ? 'Yes' : 'No'}</p>
      `,
    }),
  });

  return NextResponse.json({ success: true });
}
```

---

## 🎨 Customization

### Change Voice Clone Script

Edit `/components/VoiceCloningDemo.tsx` (line 24):

```typescript
const sampleScript = `Your custom banking script here...`;
```

### Adjust Recording Time Limits

Edit `/components/VoiceCloningDemo.tsx` (line 58):

```typescript
// Change from 60 seconds to your preferred duration
if (prev >= 90) {  // 90 seconds
  stopRecording();
  return 90;
}
```

### Modify Use Cases

Edit `/app/ai-demos/page.tsx` (lines 85-106) to add/remove banking use cases.

---

## 🧪 Testing

### Test Voice Recording

1. Run `npm run dev`
2. Navigate to `http://localhost:3000/ai-demos`
3. Click "Start Recording"
4. Allow microphone access
5. Read the sample script
6. Click "Stop Recording"
7. Verify audio playback works

### Test Lead Capture

1. Complete a voice recording
2. Modal should appear automatically
3. Fill out the form
4. Check your database/email for the lead

### Test on Mobile

- Voice recording works on iOS Safari 14.5+
- Test on actual devices, not just simulators
- Check microphone permissions

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `SESAME_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy

### Environment Variables Checklist

```bash
# Required for voice cloning
SESAME_API_KEY=xxx

# Required for lead capture (choose one)
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
# OR
HUBSPOT_API_KEY=xxx
# OR
RESEND_API_KEY=xxx
```

---

## 📈 Analytics

### Track Demo Usage

Add to `/components/VoiceCloningDemo.tsx`:

```typescript
// Track when users start recording
const startRecording = async () => {
  // ... existing code ...
  
  // Track event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_started', {
      event_category: 'voice_cloning',
      event_label: 'recording_started',
    });
  }
};

// Track completion
const generateClone = async () => {
  // ... existing code ...
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_completed', {
      event_category: 'voice_cloning',
      event_label: 'clone_generated',
    });
  }
};
```

### Key Metrics to Track

- Demo page visits
- Recording started
- Recording completed
- Voice clone generated
- Lead capture form opened
- Lead capture form submitted
- Conversion rate (visits → leads)

---

## 🔒 Security & Privacy

### Audio Data Handling

- Recordings are stored temporarily in browser memory
- No audio is saved to your server (unless you implement it)
- Sesame API may store audio per their privacy policy
- Add privacy notice to the page

### Rate Limiting

Add to `/app/api/voice-clone/route.ts`:

```typescript
import { ratelimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }
  
  // ... rest of implementation
}
```

### Privacy Policy

Add a privacy notice to the demo page explaining:
- Audio is processed for demo purposes only
- No recordings are permanently stored
- Third-party API usage (Sesame)
- Lead data handling

---

## 🐛 Troubleshooting

### Microphone Access Denied

- Ensure site is served over HTTPS (or localhost)
- Check browser permissions
- Add error message for users

### Audio Not Playing

- Check browser audio codec support
- Convert WebM to MP3 if needed
- Test across browsers (Chrome, Safari, Firefox)

### API Errors

- Verify API key is correct
- Check API rate limits
- Review API provider documentation
- Check network tab in DevTools

### Lead Capture Not Working

- Verify Supabase credentials
- Check RLS policies
- Review browser console for errors
- Test API endpoint directly

---

## 💰 Cost Estimates

### Monthly Costs (100 demos/month)

- **Sesame API**: $50-100
- **Supabase**: $0 (free tier)
- **Vercel**: $0 (free tier)
- **Total**: ~$50-100/month

### Scaling Considerations

- 1,000 demos/month: ~$200-300
- 10,000 demos/month: ~$1,000-2,000
- Consider caching and optimization

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review API provider docs
3. Check browser console for errors
4. Test in incognito mode
5. Contact your development team

---

## 🎯 Next Steps

1. ✅ Demo is functional with simulated responses
2. 🔲 Get Sesame API key
3. 🔲 Set up Supabase for lead capture
4. 🔲 Test voice cloning with real API
5. 🔲 Add analytics tracking
6. 🔲 Deploy to production
7. 🔲 Monitor usage and costs

---

**Last Updated**: January 2025
**Version**: 1.0
