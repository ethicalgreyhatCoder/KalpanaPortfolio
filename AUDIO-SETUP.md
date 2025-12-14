# Audio Setup Instructions

## Current Status

The AudioController is configured to use: `/audio/ambient-koto.mp3`

**This file does NOT exist yet.** You need to add the audio file.

### Path Resolution

The system uses Vite's `import.meta.env.BASE_URL` for proper path handling:
- **Local development:** `http://localhost:5173/audio/ambient-koto.mp3`
- **GitHub Pages:** `https://username.github.io/repo-name/audio/ambient-koto.mp3`

This ensures the audio works in both environments automatically.

---

## Option 1: Add Placeholder Silent Audio (Testing)

For testing without actual music:

1. **Create the audio directory:**
   ```bash
   # Windows (PowerShell)
   mkdir public\audio
   
   # macOS/Linux
   mkdir -p public/audio
   ```

2. **Download a silent MP3 file:**
   - Online tool: https://onlinetonegenerator.com/
   - Frequency: 440Hz
   - Duration: 1 second
   - Volume: 0% (silent)
   - Download as MP3

3. **Place it in the public folder:**
   ```
   /public/audio/ambient-koto.mp3
   ```

4. The app will now work without errors, but play silence.

---

## Option 2: Add Real Koto-Style Ambient Music (Production)

### Recommended Sources:

#### **Free / Royalty-Free:**
1. **YouTube Audio Library**
   - Search: "Japanese ambient music"
   - Filter: No copyright, instrumental
   - Download and convert to MP3

2. **Free Music Archive**
   - https://freemusicarchive.org/
   - Search: "Koto ambient" or "Zen meditation"

3. **Incompetech**
   - https://incompetech.com/
   - Search: "Asian" or "Meditation"
   - Attribution required

#### **Premium / Licensed:**
1. **Epidemic Sound** (subscription)
   - High-quality, commercial use
   - Search: "Japanese Koto ambient"

2. **AudioJungle** (one-time purchase)
   - $5-20 per track
   - Commercial license included

3. **Artlist** (subscription)
   - Unlimited downloads
   - Professional quality

---

## Audio File Requirements

Your audio file must meet these specs:

### Technical:
- **Format:** MP3 (best browser compatibility)
- **Bitrate:** 128-192 kbps (balance quality/size)
- **File size:** Under 5MB (ideally 2-3MB)
- **Sample rate:** 44.1kHz

### Musical:
- **Tempo:** 60-80 BPM (slow, calming)
- **Style:** Japanese Koto, Zen, ambient
- **Duration:** 2-5 minutes (will loop)
- **No vocals**
- **Seamless loop** (end fades into start)

---

## How to Add Your Audio File

### Step 1: Create Directory
```bash
mkdir public/audio
```

### Step 2: Add Audio File
Place your MP3 file:
```
/public/audio/ambient-koto.mp3
```

**File name must match exactly** (or update `audioConfig.js`)

### Step 3: Test
1. Hard refresh browser: `Ctrl + Shift + R`
2. Scroll the page (music should start)
3. Click floating button to pause/resume

---

## Changing the Audio File

To use a different audio file:

### Option A: Replace File (Same Name)
Just replace `/public/audio/ambient-koto.mp3` with your new file.

### Option B: Different File Name
1. Edit `src/config/audioConfig.js`:
   ```javascript
   audioSrc: '/audio/your-new-file.mp3',
   ```

2. Place your file in `/public/audio/`

---

## Troubleshooting

### "Audio not playing"
1. Check browser console for errors
2. Verify file exists: `http://localhost:5173/audio/ambient-koto.mp3`
3. Try opening file URL directly in browser
4. Check file format (must be MP3)

### "Audio plays but volume is too loud/quiet"
Edit `src/config/audioConfig.js`:
```javascript
defaultVolume: 0.12, // Adjust between 0.05 - 0.20
```

### "Audio doesn't loop smoothly"
1. Ensure audio file has no silence at start/end
2. Use an audio editor to create seamless loop:
   - Audacity (free)
   - Adobe Audition
   - GarageBand

### "Scroll trigger not working"
1. Make sure page is scrollable (content extends below viewport)
2. Check browser console for errors
3. Try scrolling more than a few pixels

---

## Testing Without Audio File

If you want to test the UI without audio:

1. The app will show a console warning but won't crash
2. The floating button will appear and be interactive
3. The equalizer animation will work
4. No sound will play (obviously)

---

## Audio File Search Terms

When searching for music, use these keywords:

- "Japanese Koto instrumental"
- "Zen garden ambient"
- "Cherry blossom meditation music"
- "Asian ambient background music"
- "Shakuhachi Koto calm"
- "Japanese tea ceremony music"
- "Minimal Asian instrumental loop"

---

## Example: Free Music Option

**Quick Solution:**

1. Go to: https://freemusicarchive.org/
2. Search: "Japanese ambient"
3. Filter: Instrumental, Ambient, Asian
4. Download a track you like
5. Convert to MP3 if needed (online-convert.com)
6. Place in `/public/audio/ambient-koto.mp3`

Done!

---

## Production Checklist

Before deploying:

- [ ] Audio file added to `/public/audio/`
- [ ] File size under 5MB
- [ ] Audio loops smoothly
- [ ] Volume is subtle (not overwhelming)
- [ ] Tested on mobile devices
- [ ] Tested with headphones
- [ ] License/attribution clear (if required)

---

## License & Attribution

If your audio requires attribution:

1. Add credit in website footer:
   ```
   Music by [Artist] via [Platform]
   ```

2. Or in a separate credits page

3. Follow the specific license terms

---

**Current Status:** ⚠️ **Audio file required**

Add your audio file to `/public/audio/ambient-koto.mp3` to enable music.

