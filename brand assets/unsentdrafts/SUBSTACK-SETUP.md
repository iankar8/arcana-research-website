# Substack Setup Guide for Unsent Drafts

## 🚀 Quick Setup

### Step 1: Upload Your Logos

You need to host your logo files somewhere. Options:

1. **Substack's Media Library** (Recommended)
   - Go to any post editor
   - Click the image icon
   - Upload `logo-horizontal-enhanced.svg` and `icon-enhanced.svg`
   - Copy the URLs Substack generates

2. **Imgur** (Free, easy)
   - Go to https://imgur.com
   - Upload both SVG files
   - Right-click → "Copy image address"

3. **Cloudinary** (Professional)
   - Sign up at https://cloudinary.com
   - Upload files
   - Copy the public URLs

### Step 2: Add Custom Header

1. Go to **Settings** → **Web** → **Custom Header**
2. Open `substack-header.html`
3. Replace `YOUR_LOGO_URL_HERE` with your hosted logo URL
4. Paste the entire code block
5. Save

### Step 3: Add Custom Footer

**Option A: Site-wide Footer**
1. Go to **Settings** → **Web** → **Custom Footer**
2. Open `substack-footer.html`
3. Replace `YOUR_ICON_URL_HERE` with your hosted icon URL
4. Update social media links
5. Paste the entire code block
6. Save

**Option B: Per-Post Footer**
1. At the end of each post, click the `</>` (HTML) button
2. Paste the footer code
3. Update URLs as needed

### Step 4: Customize Substack Settings

**Publication Settings:**
- **Name**: Unsent Drafts
- **Tagline**: A Newsletter From Ian Kar
- **Description**: Thoughts, ideas, and stories from the drafts folder—finally ready to send.

**Design Settings:**
- **Primary Color**: `#00D9FF` (cyan)
- **Accent Color**: `#FF3B9A` (pink)
- **Background**: Keep default or use `#f5f5f5`

**Social Links:**
- Add your Twitter, LinkedIn, Website in Settings → Publication Details

### Step 5: Set Up Your Profile

1. Go to **Settings** → **Profile**
2. Upload `icon-enhanced.svg` as your profile picture (Substack may convert to PNG)
3. Add your bio
4. Link your social accounts

## 📝 Writing Your First Post

### Post Structure

```
[Your engaging opening]

[Main content with headers using ## or ###]

[Include images, quotes, or highlights]

[Call to action or question for readers]

---

[Footer will appear here if you set it up site-wide]
```

### Substack-Specific Tips

1. **Use Substack's Native Features**
   - Polls
   - Subscribe buttons
   - Comment sections
   - Recommendations

2. **Formatting**
   - Use `##` for H2 headers (matches your brand colors if you set them)
   - Use `>` for blockquotes
   - Use `---` for dividers

3. **Images**
   - Upload directly to Substack
   - They handle hosting and optimization
   - Add alt text for accessibility

## 🎨 Brand Colors Reference

Use these in Substack's design settings:

- **Primary (Cyan)**: `#00D9FF`
- **Accent (Pink)**: `#FF3B9A`
- **Orange**: `#FF8C42`
- **Dark Background**: `#1a1a2e`
- **Text**: `#333333`

## 📧 Email Settings

**Subject Line Format:**
- `Unsent Drafts: [Your Title]`
- `[Your Title] - Unsent Drafts #[Number]`

**Preview Text:**
- Keep it punchy and intriguing
- 40-50 characters works best

## 🔗 Social Media Assets

Use these files for your social presence:

- **Twitter/X Profile**: `logo-enhanced.svg` (1024x1024)
- **LinkedIn**: `logo-enhanced.svg`
- **Website Favicon**: `icon-enhanced.svg` (convert to .ico if needed)
- **Open Graph Image**: `logo-enhanced.svg` (for link previews)

## ✅ Launch Checklist

- [ ] Upload logos to hosting
- [ ] Add custom header with logo URL
- [ ] Add custom footer with icon URL
- [ ] Update social media links in footer
- [ ] Set brand colors in Substack design settings
- [ ] Upload profile picture
- [ ] Write compelling publication description
- [ ] Create "About" page
- [ ] Write welcome email for new subscribers
- [ ] Test email by subscribing yourself
- [ ] Share first post!

## 💡 Pro Tips

1. **Consistency**: Use the same header/footer format for every post
2. **Mobile**: Test how it looks on mobile (Substack handles this well)
3. **Engagement**: End each post with a question to encourage replies
4. **Cross-promotion**: Share on Twitter/LinkedIn with your logo
5. **Archive**: Your Substack archive page will look great with consistent branding

## 🆘 Troubleshooting

**Logo not showing?**
- Check the URL is publicly accessible
- Make sure it's HTTPS, not HTTP
- Try uploading to Substack's media library instead

**Colors look different?**
- Substack may override some styles
- Use the design settings for primary colors
- Custom HTML should work for header/footer

**Footer not appearing?**
- Make sure you saved in the right section
- Try clearing cache and refreshing
- Check if HTML is enabled in your settings

---

Need help? The full HTML templates are in:
- `substack-header.html`
- `substack-footer.html`
- `newsletter-template.html` (for reference)

Happy writing! 🚀
