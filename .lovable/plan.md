

# Add Video Modal to American Way Health Landing Page

## Recommendation: Video Popup Modal

A modal/popup approach will perform better than hero embedding because:
- Keeps the hero section focused on the primary conversion goal (form submissions)
- Video loads on-demand, improving page performance
- Works seamlessly on mobile devices
- Users who click to watch show higher intent

---

## Implementation Details

### Add to Hero Section
Place a "Watch Video" button below the main CTA in the hero, styled as a secondary action:

```text
[Get Your Free Quote]  ← Primary CTA (existing)
      ▶ Watch Video     ← New secondary link
```

### Video Modal Component
Create a responsive modal that:
- Opens when "Watch Video" is clicked
- Contains the Loom embed iframe
- Closes on overlay click or X button
- Pauses video when closed

### Loom Embed URL
```
https://www.loom.com/embed/bed6522f3c6a4b9aa857a60bd0be9f85
```

---

## Files to Modify

### `src/pages/AmericanWayHealth.tsx`

**Add imports:**
- Import `Dialog`, `DialogContent`, `DialogTitle` from `@/components/ui/dialog`
- Import `useState` from React
- Import `Play` icon from lucide-react

**Add state:**
```typescript
const [videoOpen, setVideoOpen] = useState(false);
```

**Add to Hero section (after main CTA button, around line 191):**
```typescript
<button
  onClick={() => setVideoOpen(true)}
  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
>
  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
    <Play className="w-5 h-5 text-white fill-white" />
  </div>
  <span className="font-medium">Watch Video</span>
</button>
```

**Add Video Modal (before closing fragment):**
```typescript
<Dialog open={videoOpen} onOpenChange={setVideoOpen}>
  <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
    <DialogTitle className="sr-only">
      Partnership Video - American Way Health
    </DialogTitle>
    <div className="aspect-video">
      <iframe
        src="https://www.loom.com/embed/bed6522f3c6a4b9aa857a60bd0be9f85"
        frameBorder="0"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  </DialogContent>
</Dialog>
```

---

## Visual Layout (Hero Section)

```text
┌─────────────────────────────────────────────┐
│   GET FREE INSURANCE QUOTES NOW             │
│                                             │
│   EASY WAY TO SHOP FOR INSURANCE            │
│                                             │
│   GET EXACTLY WHAT YOU NEED                 │
│   PERSONAL / FAMILY / GROUP PLANS           │
│                                             │
│        ┌────────────────────┐               │
│        │ Get Your Free Quote│  ← Gold CTA   │
│        └────────────────────┘               │
│                                             │
│         ▶ Watch Video          ← New link   │
│                                             │
│   No obligation. No cost. Just answers.     │
└─────────────────────────────────────────────┘
```

---

## Expected Outcome

- Clean, focused hero with optional video engagement
- Modal opens with Loom video embed (16:9 aspect ratio)
- Video title: "Seamless Client Transfers for Health Insurance Services"
- Close button and click-outside-to-close functionality
- Responsive design works on all devices

