# Base Block Preset System — Research & Future Planning

> **Date:** 2026-02-18
> **Status:** Research / Future Planning
> **Related:** [base-block-strategy.md](file:///c:/Users/Rubel%20Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/log/base-block-strategy.md)

---

## 📋 Problem Statement

The base block currently has a **single fixed DOM structure** for every slide:

```
swiper-slide
  └── gslider-content-wrapper
        └── gslider-content-inner-wrapper
              └── gslider-list-item
                    └── gslider-list-content
                          ├── subtitle (RichText)
                          ├── title (RichText)
                          ├── description (RichText)
                          └── buttons (primary + secondary)
```

**No image content element exists.** A customer is already embedding `<img>` tags directly inside the title RichText field as a workaround — this proves there's real demand for image support and different layout structures.

---

## 🔍 Competitor Analysis

### How Top Plugins Handle Presets

| Plugin | Approach | Preset Count | Image Support |
|--------|----------|-------------|---------------|
| **Smart Slider 3** | Layer-based system, 500+ UI kits | 200+ templates | ✅ Image layer, video bg |
| **Slider Revolution** | Module-based, rich template library | 250+ templates | ✅ Full media layers |
| **Sliderberg** | InnerBlocks (any Gutenberg block) | Flexible | ✅ Via any block |
| **GutSlider** | Slide-any-content, block composition | Flexible | ✅ Via blocks |
| **MetaSlider** | Fixed slide types (image, post, video) | 4 types | ✅ Dedicated image slide |

### Key Takeaway
The market splits into two approaches:
1. **Template/Preset model** — pre-built DOM layouts the user picks from (Smart Slider, Slider Revolution)
2. **Compose model** — users drop any blocks inside slides (Sliderberg, GutSlider, our flexi-content)

**Our opportunity:** The base block should do **Approach 1** (structured presets with different DOM layouts) while `flexi-content` already handles **Approach 2** (InnerBlocks compose model).

---

## 🏗️ Gutenberg API Options for Presets

### Option A: Block Variations API (⭐ Recommended)

```js
// Register variations in index.js or a separate variations.js
wp.blocks.registerBlockVariation('gslider-blocks/base', {
    name: 'hero-banner',
    title: 'Hero Banner Slider',
    description: 'Full-width hero with image, title, and CTA',
    attributes: { presetType: 'hero-banner' },
    icon: 'cover-image',
    scope: ['inserter', 'transform'],
});
```

**Pros:**
- Each preset appears as a separate option in the Block Inserter
- User picks the layout BEFORE inserting — no confusion
- Clean upgrade path, no breaking changes
- Can have unique icons & descriptions per preset

**Cons:**
- All variations share one `save.js` — needs conditional DOM rendering
- Attributes file grows (but manageable via shared defaults)

---

### Option B: Block Styles API

```js
wp.blocks.registerBlockStyle('gslider-blocks/base', {
    name: 'hero-banner',
    label: 'Hero Banner',
});
```

**Pros:** Simple CSS class toggling
**Cons:** Only changes CSS, **cannot change DOM structure** — not suitable for different layouts

---

### Option C: Separate Blocks Per Preset

Register `gslider-blocks/hero-slider`, `gslider-blocks/content-slider`, etc.

**Pros:** Clean separation, independent evolution
**Cons:** Massive code duplication, more maintenance burden

---

### Recommendation: **Option A (Block Variations)** with a `presetType` attribute that controls DOM rendering in both `edit.js` and `save.js`.

---

## 🎨 Proposed Preset Catalog

### Preset 1: **Content Slider** (Current Default)
The existing layout — subtitle, title, description, buttons over a background.

```
swiper-slide
  └── gslider-content-wrapper
        └── gslider-content-inner-wrapper
              └── gslider-list-item
                    └── gslider-list-content
                          ├── .gslider-subtitle-wrapper
                          ├── .gslider-title-wrapper
                          ├── .gslider-description-wrapper
                          └── .gslider-btn-wrapper
```

**Use Case:** Announcements, news, generic content rotation

---

### Preset 2: **Hero Banner** ⭐ High Priority
Full-width hero with optional foreground image/logo, headline, text, and CTA.

```
swiper-slide
  └── gslider-content-wrapper.preset-hero
        └── gslider-content-inner-wrapper
              └── gslider-list-item
                    └── gslider-list-content
                          ├── .gslider-hero-image-wrapper     ← NEW (foreground img/logo)
                          │     └── <img />
                          ├── .gslider-subtitle-wrapper
                          ├── .gslider-title-wrapper
                          ├── .gslider-description-wrapper
                          └── .gslider-btn-wrapper
```

**New Attributes per slide:**
- `heroImageUrl` (object: Desktop/Tablet/Mobile)
- `heroImageAlt`, `heroImageID`
- `heroImageWidth`, `heroImageHeight`
- `heroImagePosition` (above-title, below-title, left, right)

**Why Important:** This is exactly what the customer is trying to achieve by embedding `<img>` in the title field. A proper image element with dedicated controls (size, position, alt text) is far better.

---

### Preset 3: **Image + Text Split**
Side-by-side layout — image on one side, content on the other.

```
swiper-slide
  └── gslider-content-wrapper.preset-split
        └── gslider-split-layout
              ├── .gslider-split-media (50%)
              │     └── <img /> or background
              └── .gslider-split-content (50%)
                    ├── .gslider-subtitle-wrapper
                    ├── .gslider-title-wrapper
                    ├── .gslider-description-wrapper
                    └── .gslider-btn-wrapper
```

**New Attributes:**
- `splitImageUrl/Alt/ID` (responsive)
- `splitRatio` (50/50, 40/60, 60/40)
- `splitImageSide` (left/right)
- `splitReverseMobile` (boolean — stack vertically on mobile)

**Use Case:** Product showcases, team introductions, feature highlights

---

### Preset 4: **Card Slider**
Card-style slides with featured image, content below.

```
swiper-slide
  └── gslider-content-wrapper.preset-card
        └── gslider-card-layout
              ├── .gslider-card-image
              │     └── <img />
              └── .gslider-card-body
                    ├── .gslider-subtitle-wrapper
                    ├── .gslider-title-wrapper
                    ├── .gslider-description-wrapper
                    └── .gslider-btn-wrapper
```

**New Attributes:**
- `cardImageUrl/Alt/ID` (responsive)
- `cardImageHeight` / `cardImageAspectRatio`
- `cardBorderRadius`, `cardShadow`

**Use Case:** Blog post carousel, product carousel, portfolio

---

### Preset 5: **Minimal / Text Only**
Clean text-focused slider — no image element, streamlined DOM.

```
swiper-slide
  └── gslider-content-wrapper.preset-minimal
        └── gslider-minimal-content
              ├── .gslider-title-wrapper
              ├── .gslider-description-wrapper
              └── .gslider-btn-wrapper (optional)
```

**Use Case:** Quotes, announcements, simple text rotators

---

### Preset 6: **Full Image / Background Only**
Image-dominant slider — large image with minimal text overlay.

```
swiper-slide
  └── gslider-content-wrapper.preset-fullimage
        └── gslider-fullimage-layout
              ├── .gslider-fullimage-media        ← foreground <img>
              │     └── <img />
              └── .gslider-fullimage-caption       ← optional
                    ├── .gslider-title-wrapper
                    └── .gslider-btn-wrapper
```

**Use Case:** Photo galleries, portfolio showcase, Instagram-style

---

## 🔧 Architecture Design

### The `presetType` Attribute

```js
// In attributes.js
presetType: {
    type: "string",
    default: "content"   // backward compatible with current behavior
},
```

Possible values: `content`, `hero-banner`, `split`, `card`, `minimal`, `fullimage`

### Conditional Rendering Pattern

```js
// In save.js and edit.js
const renderSlideContent = (item, index) => {
    switch (presetType) {
        case 'hero-banner':
            return <HeroBannerSlide item={item} ... />;
        case 'split':
            return <SplitSlide item={item} ... />;
        case 'card':
            return <CardSlide item={item} ... />;
        case 'minimal':
            return <MinimalSlide item={item} ... />;
        case 'fullimage':
            return <FullImageSlide item={item} ... />;
        case 'content':
        default:
            return <ContentSlide item={item} ... />;  // current behavior
    }
};
```

### File Organization

```
src/blocks/base/
  ├── attributes.js           (shared + preset-specific attributes)
  ├── edit.js                 (main Edit with preset switch)
  ├── save.js                 (main Save with preset switch)
  ├── inspector.js            (conditional inspector panels)
  ├── styling.js              (preset-specific CSS generation)
  ├── presets/                 ← NEW folder
  │   ├── index.js            (register all variations)
  │   ├── content-slide.js    (current default render)
  │   ├── hero-banner.js      (hero preset render)
  │   ├── split-slide.js      (split preset render)
  │   ├── card-slide.js       (card preset render)
  │   ├── minimal-slide.js    (minimal preset render)
  │   └── fullimage-slide.js  (fullimage preset render)
  └── deprecated.js           (handle migration)
```

---

## ⚠️ Important Considerations

### Backward Compatibility
- Existing blocks must keep working → `presetType` defaults to `"content"`
- Current DOM structure is the `content` preset → zero breaking changes
- A `deprecated.js` entry will handle migration if the default preset DOM changes

### Per-Slide vs Per-Block Preset
Two possible approaches:

| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| **Per-Block** | All slides in one slider share the same preset | Simple, consistent look | Less flexible |
| **Per-Slide** | Each slide can have a different DOM layout | Maximum flexibility | Complex, potentially confusing UX |

**Recommendation:** Start with **Per-Block** preset (single `presetType` attribute on the block). This keeps the UX simple and the code manageable. Per-slide mixing can be a future Pro feature.

### Image Handling for New Presets
Each preset that adds image content needs:
- `MediaUpload` component in editor
- Responsive image URLs (Desktop/Tablet/Mobile)
- Alt text
- Focal point picker
- Lazy loading integration

### CSS Strategy
Each preset gets a unique class on `.gslider-content-wrapper`:
- `.preset-content` (default)
- `.preset-hero`
- `.preset-split`
- `.preset-card`
- `.preset-minimal`
- `.preset-fullimage`

Preset-specific CSS is generated in `styling.js` based on `presetType`, keeping the CSS tree-shakeable.

---

## 📊 Priority & Effort Matrix

| Preset | Priority | Effort | Customer Demand | Free/Pro |
|--------|----------|--------|-----------------|----------|
| **Hero Banner** | 🔴 Critical | Medium | Already requested (customer img hack) | Free |
| **Card Slider** | 🟡 High | Medium | Very common pattern | Free (basic) / Pro (advanced) |
| **Split Layout** | 🟡 High | High | Popular for landing pages | Pro |
| **Minimal Text** | 🟢 Medium | Low | Quick win, easy to build | Free |
| **Full Image** | 🟢 Medium | Medium | Portfolio/gallery use case | Free (basic) / Pro (advanced) |

---

## 🗺️ Implementation Roadmap

### Phase 1 — Foundation (v1.3.x)
1. Add `presetType` attribute with `"content"` default
2. Create `presets/` folder and extract current slide render into `content-slide.js`
3. Build **Hero Banner** preset (solves customer image issue)
4. Register Block Variation for Hero Banner

### Phase 2 — Expansion (v1.4.x)
5. Build **Card Slider** preset
6. Build **Minimal Text** preset
7. Add preset-specific inspector panels

### Phase 3 — Pro Presets (v2.x / Pro)
8. Build **Split Layout** preset
9. Build **Full Image** preset
10. Add per-slide preset mixing (Pro)
11. Add advanced image controls (Ken Burns, parallax)
12. Template library with one-click import

---

## 💡 Research Notes

### What Makes Smart Slider 3 Successful
- **Layer system** — absolute positioning of any element anywhere on the slide
- **Static overlay** — content stays fixed while background images slide
- **500+ UI kits** — massive template library reduces setup time to near-zero
- **Responsive text scaling** — text adapts automatically to screen size

### What Makes Sliderberg/GutSlider Work
- **InnerBlocks** — leverages Gutenberg's native block composition
- **No custom DOM needed** — users bring their own blocks
- **Lower maintenance** — fewer custom controls to build

### Our Competitive Edge
- **Structured presets** (base block) + **Flexible compose** (flexi-content) = covers both user types
- Pre-built presets lower the barrier for beginners
- InnerBlocks approach in flexi-content satisfies power users
- Both blocks share the same Swiper infrastructure — consistent behavior

---

## ✅ Next Steps

1. **Immediate:** Review this research and decide which presets to prioritize
2. **Phase 1:** Implement `presetType` attribute + Hero Banner preset
3. **Ongoing:** Collect customer feedback on which presets are most requested
4. **Future:** Build a preset preview/selector UI in the block inserter
