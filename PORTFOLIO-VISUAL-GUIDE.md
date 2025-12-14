# Portfolio Refactor - Visual Architecture Guide

## 📐 Component Structure

```
Portfolio Section
├─ Header
│  ├─ Title: "My Portfolio"
│  └─ Divider line
│
├─ Category Navigation (Horizontal Scroll)
│  ├─ 💄 Makeup (active)
│  ├─ ✨ Hair
│  ├─ 💅 Nails
│  └─ 👁️ Eyes
│  └─ Edge Fade Indicators (left/right)
│
├─ Sub-Filter Navigation (Horizontal Scroll)
│  ├─ All (active with underline)
│  ├─ Bridal
│  ├─ Editorial
│  ├─ Party
│  └─ ... (category-specific)
│
├─ Portfolio Grid (Full-Width Cards)
│  ├─ Card 1
│  ├─ Card 2
│  ├─ Card 3
│  └─ ...
│
└─ Instagram CTA Button
```

---

## 🎴 Card Anatomy (Before vs After)

### BEFORE (Boxed/SIM-Card Style)
```
┌─────────────────────────┐
│ ┌───────────────────┐   │ ← Heavy border
│ │                   │   │
│ │   Image           │   │ ← Contained
│ │                   │   │
│ │                   │   │
│ └───────────────────┘   │
│ ┌───────────────────┐   │
│ │ Title             │   │
│ │ Metadata          │   │
│ │ [Large Button]    │   │ ← Heavy CTA
│ └───────────────────┘   │
│                         │
└─────────────────────────┘
Heavy shadow, contained
```

### AFTER (Full-Width, Immersive)
```
┌─────────────────────────┐ ← Rounded top
│   Image (Edge-to-Edge)  │
│                         │ ← Full width
│                         │
│                         │
├─────────────────────────┤ ← Soft divider
│ Title                   │
│ Dynamic Metadata        │
│ [View Case Study]       │ ← Tertiary
└─────────────────────────┘ ← Slightly rounded
Light shadow, immersive
```

**Key Differences:**
- ✅ No heavy border/padding
- ✅ Image spans full width
- ✅ Top rounded (1.25rem), bottom slightly rounded (0.75rem)
- ✅ Reduced shadow (0 2px 8px vs 0 8px 20px)
- ✅ Feels like modal preview

---

## 🗂️ Category Tab States

### Inactive Tab
```
┌─────────────────┐
│ 💄 Makeup       │ ← White bg, low opacity
└─────────────────┘
  opacity: 0.7
  border: subtle
```

### Active Tab
```
┌─────────────────┐
│ 💄 Makeup       │ ← Gradient bg, white text
└─────────────────┘
  gradient: rose-gold
  shadow: visible
  centered in scroll
```

### Hover State
```
┌─────────────────┐
│ 💄 Makeup       │ ← White bg, full opacity
└─────────────────┘
  opacity: 1.0
  border: accent color
```

---

## 📊 Filter Tab States

### Inactive Filter
```
All    Bridal    Editorial    Party
───    ------    ---------    -----
       (no underline)
       opacity: 0.6
```

### Active Filter
```
All    Bridal    Editorial    Party
───    ══════    ---------    -----
       └─ Animated underline (rose-gold, 2px)
       opacity: 1.0
       color: accent
```

---

## 📱 Modal Layout (Bottom-Sheet)

```
┌─────────────────────────────────────┐
│ Dark Overlay (75% opacity + blur)   │
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ MODAL HEADER                  ║   │
│ ║ ┌───────────────────────────┐ ║   │
│ ║ │ Blurred Image Background  │ ║   │
│ ║ │ + Dark Overlay            │ ║   │
│ ║ │                           │ ║   │
│ ║ │ Title (White)             │ ║   │
│ ║ │ Subtitle (White)          │ ║   │
│ ║ └───────────────────────────┘ ║   │
│ ╠═══════════════════════════════╣   │
│ ║ SCROLLABLE CONTENT            ║   │
│ ║                               ║   │
│ ║ Client Profile                ║   │
│ ║ Lorem ipsum...                ║   │
│ ║                               ║   │
│ ║ Technique & Approach          ║   │
│ ║ Lorem ipsum...                ║   │
│ ║                               ║   │
│ ║ Why These Choices?            ║   │
│ ║ Rationale explanation...      ║   │
│ ║                               ║   │
│ ║ Key Products                  ║   │
│ ║ ┌──────────────────┐          ║   │
│ ║ │ Brand: MAC       │          ║   │
│ ║ │ Product Name     │          ║   │
│ ║ └──────────────────┘          ║   │
│ ║                               ║   │
│ ║ Result                        ║   │
│ ║ Highlight text (rose-gold)    ║   │
│ ║                               ║   │
│ ║ [View on Instagram Button]    ║   │
│ ║                               ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Color Hierarchy

### Primary Actions
```
┌──────────────────────┐
│ Book Session         │ ← Full gradient background
└──────────────────────┘
  background: gradient
  color: white
  shadow: prominent
```

### Secondary Actions
```
┌──────────────────────┐
│ See More on Instagram│ ← Outlined, accent color
└──────────────────────┘
  background: transparent
  border: 2px accent
  color: accent
```

### Tertiary Actions
```
┌──────────────────────┐
│ View Case Study      │ ← Subtle outline, low contrast
└──────────────────────┘
  background: transparent
  border: 1px subtle
  opacity: 0.7
  color: text
```

---

## 🔄 Data Flow Diagram

```
portfolioData.js
├─ makeupLooks[]
│  ├─ Look 1 { id, title, category, ... }
│  ├─ Look 2 { ... }
│  └─ Look 3 { ... }
│
├─ hairStyles[]
│  ├─ Style 1 { id, title, hairType, ... }
│  └─ Style 2 { ... }
│
├─ nailDesigns[]
│  └─ Design 1 { id, title, nailShape, ... }
│
└─ eyeLooks[]
   └─ Look 1 { id, title, eyeShape, ... }

         ↓ imported by

Gallery-Refactored.jsx
├─ State: activeCategory = 'makeup'
├─ State: activeFilter = 'All'
├─ Get current category config
├─ Filter items: getItemsByCategory(category, filter)
│
└─ Render:
   ├─ Category tabs (from portfolioCategories)
   ├─ Filter tabs (from currentCategory.filters)
   ├─ Cards (from filtered items)
   │  └─ Display metadata (category-specific)
   └─ Modal (if item selected)
      └─ Display case study details
```

---

## 📐 Spacing System

### Mobile (0-767px)
```
Section padding:     3rem (48px)
Card gap:            1.25rem (20px)
Content padding:     1.25rem (20px)
Tab gap:             0.75rem (12px)
Filter gap:          1.5rem (24px)
```

### Desktop (768px+)
```
Section padding:     4rem (64px)
Card gap:            1.5rem (24px)
Content padding:     1.5rem (24px)
Container:           max-width 1200px
```

---

## 🎭 Animation Timeline

### Modal Opening
```
t=0ms:     Modal at translateY(100%)
           Overlay opacity: 0

t=200ms:   Modal sliding up
           Overlay fading in

t=400ms:   Modal fully visible ✓
           Overlay at 75% opacity ✓
           Blur applied ✓
```

### Category Switch
```
t=0ms:     User clicks "Hair" tab

t=100ms:   Filter resets to "All"
           Items start fading out

t=200ms:   New items fade in
           Filter tabs update

t=300ms:   Complete transition ✓
```

### Card Tap
```
t=0ms:     User taps card
t=50ms:    Card scales to 0.98
t=150ms:   Modal starts appearing
t=400ms:   Modal fully visible ✓
```

---

## 📊 Metadata Display Logic

```javascript
// Dynamic metadata based on category
if (category === 'makeup') {
    return (
        <span>Combination</span>  // skinType
        ·
        <span>Wedding</span>      // occasion
    );
}

if (category === 'hair') {
    return (
        <span>Medium-thick</span> // hairType
        ·
        <span>Long</span>         // length
    );
}

if (category === 'nails') {
    return (
        <span>Almond</span>       // nailShape
        ·
        <span>Medium</span>       // nailLength
    );
}
```

**Result:**
- Each category shows relevant information
- No generic "Type · Duration" across all
- Professional, contextual metadata

---

## 🎯 Touch Target Sizes

```
Category Tab:    ≥ 44px height (pill-shaped)
Filter Tab:      ≥ 44px height (horizontal)
Card:            Full width, tall enough (image + content)
Tertiary CTA:    ~40px height (acceptable for tertiary)
Close Button:    44px × 44px (circular)
Modal Button:    ≥ 44px height (full-width)
```

All primary/secondary interactions meet WCAG AAA standard (44px).

---

## 🔧 Extensibility Example

### Adding a New Category (e.g., "Skincare")

**Step 1:** Add data to `portfolioData.js`
```javascript
export const skincareRoutines = [
    {
        id: 'skincare-1',
        title: 'Anti-Aging Facial',
        category: 'Anti-Aging',
        subCategory: 'Facial',
        image: 'url',
        
        // Skincare-specific
        skinConcern: 'Fine lines',
        duration: '60 minutes',
        
        caseStudy: { ... },
        
        tags: ['antiaging', 'facial']
    }
];
```

**Step 2:** Add to categories array
```javascript
export const portfolioCategories = [
    // ...existing categories
    {
        id: 'skincare',
        title: 'Skincare',
        icon: '🧴',
        data: skincareRoutines,
        filters: ['All', 'Anti-Aging', 'Hydration', 'Acne']
    }
];
```

**Step 3:** Add metadata renderer (optional)
```javascript
if (category === 'skincare') {
    return (
        <span>{item.skinConcern}</span>
        ·
        <span>{item.duration}</span>
    );
}
```

**Done!** New category automatically appears in navigation.

---

## 🎉 Summary Visual

```
┌───────────────────────────────────────────────┐
│ Portfolio System (Refactored)                 │
├───────────────────────────────────────────────┤
│                                               │
│ ┌─────────────────────────────────────────┐   │
│ │ Data Layer (portfolioData.js)           │   │
│ │ ├─ Structured objects per category      │   │
│ │ ├─ Category-specific metadata           │   │
│ │ └─ Helper functions                     │   │
│ └─────────────────────────────────────────┘   │
│              ↓                                │
│ ┌─────────────────────────────────────────┐   │
│ │ Component Layer (Gallery-Refactored)    │   │
│ │ ├─ Category tabs (scalable)            │   │
│ │ ├─ Dynamic filters                      │   │
│ │ ├─ Full-width cards                     │   │
│ │ └─ Bottom-sheet modal                   │   │
│ └─────────────────────────────────────────┘   │
│              ↓                                │
│ ┌─────────────────────────────────────────┐   │
│ │ Style Layer (Gallery-Refactored.css)    │   │
│ │ ├─ Mobile-first responsive              │   │
│ │ ├─ Premium animations                   │   │
│ │ ├─ Touch-optimized                      │   │
│ │ └─ Rose-gold aesthetic                  │   │
│ └─────────────────────────────────────────┘   │
│                                               │
└───────────────────────────────────────────────┘

Result: Scalable, maintainable, premium UX
```

---

**Status:** ✅ Architecture Complete & Production Ready


