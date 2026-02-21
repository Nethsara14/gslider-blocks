# Testimonial Block — Deep Research Report

> **Date:** February 19, 2026
> **Purpose:** Complete analysis of preset possibilities, architecture impact, new features, and DOM changes
> **Status:** Block NOT yet published — preparing for v1.3.0 release

---

## 📊 Executive Summary

The testimonial block is **architecturally solid** and designed for extensibility. The current `contentOrder` + `renderMap` pattern already supports adding new elements without breaking existing DOM. **No fundamental architecture changes are needed** for presets — only a new `presetStyle` attribute and CSS class-based theming.

| Question | Answer |
|----------|--------|
| Architecture change needed? | ❌ No — current `renderMap` + `contentOrder` pattern is perfect |
| New DOM elements needed? | ✅ Yes — for some presets (quote icon, company logo, review date, review link) |
| New features needed? | ✅ Yes — pending features from `remaining-free-features.md` must be completed before presets |
| Total presets possible | **12 presets** (5 Free + 7 Pro) |

---

## 🏗️ Current Architecture Analysis

### File Sizes (Complexity Indicator)
| File | Lines | Size | Role |
|------|-------|------|------|
| `attributes.js` | 3,421 | 79KB | Data schema — largest file |
| `inspector.js` | 3,238 | 177KB | Settings UI — most complex |
| `styling.js` | 1,701 | 102KB | Dynamic CSS generation |
| `edit.js` | 802 | 41KB | Editor rendering |
| `save.js` | 399 | 25KB | Frontend rendering |
| `sortableItem.js` | 282 | 18KB | Per-slide settings |
| `style.scss` | 86 | 2KB | Base styles |
| `view.js` | 32 | 1KB | Swiper initialization |

### Current DOM Structure (save.js)
```
.gslider-testimonial-wrapper.{blockId}     ← wrapper
  └── .swiper
        └── .swiper-wrapper
              └── .swiper-slide (.slide-mode if slider)
                    └── .gslider-content-wrapper.{itemId}.{globalClass}
                          └── .gslider-content-inner-wrapper
                                ├── .gslider-author-image-wrapper > img.gslider-author-image
                                ├── .gslider-testimonial-title-wrapper > h3.gslider-testimonial-title
                                ├── .gslider-testimonial-text-wrapper > p.gslider-testimonial-text
                                ├── .gslider-rating-wrapper > .gslider-rating-inner > .gslider-testimonial-rating-wrap > icons
                                ├── .gslider-author-name-wrapper > h4.gslider-author-name
                                └── .gslider-author-designation-wrapper > span.gslider-author-designation
```

### Content Order System
- `contentOrder` attribute: `['image', 'title', 'text', 'rating', 'name', 'designation']`
- Uses `renderMap` object → mapped via `contentOrder.map(key => renderMap[key])`
- **This is the KEY extensibility point** — new elements just add new keys to `renderMap`

### Current Rendered Elements (6 total)
| Key | Element | Rendered? | Data Exists? |
|-----|---------|-----------|-------------|
| `image` | Author Image | ✅ Yes | ✅ |
| `title` | Testimonial Title | ✅ Yes | ✅ |
| `text` | Testimonial Text | ✅ Yes | ✅ |
| `rating` | Star Rating | ✅ Yes | ✅ |
| `name` | Author Name | ✅ Yes | ✅ |
| `designation` | Designation | ✅ Yes | ✅ |
| `companyName` | Company Name | ❌ Not rendered | ✅ Data in `sortableItem` |
| `companyLogo` | Company Logo | ❌ Not rendered | ✅ Data in attributes |
| `quoteIcon` | Quote Icon | ✅ Rendered | ✅ Data exists |
| `reviewDate` | Review Date | ❌ Not rendered | ❌ No data |
| `reviewLink` | Review Link | ❌ Not rendered | ❌ No data |

---

## 🎨 Preset Analysis — How Many & What Kind

### How Presets Work (No Architecture Change Needed)

Presets are **CSS-only variations** using a single `presetStyle` attribute that adds a class to the wrapper:

```
.gslider-content-wrapper.preset-classic  ← Preset 1
.gslider-content-wrapper.preset-card     ← Preset 2
.gslider-content-wrapper.preset-bubble   ← Preset 3
```

The `renderMap` + `contentOrder` system handles element visibility and ordering.
CSS handles layout differences (flex direction, alignment, grouping via CSS Grid).

### Implementation Requirement

**1 new attribute needed:**
```js
presetStyle: {
    type: "string",
    default: "preset-classic"
}
```

**1 CSS class added to wrapper:**
```jsx
<div className={`gslider-content-wrapper ${item.id} ${presetStyle} ${globalClass}`}>
```

**Theme-specific CSS in `style.scss`** — no extra DOM needed for most presets.

---

## 📋 Complete Preset Plan — 12 Presets (5 Free + 7 Pro)

### FREE Presets (5)

---

#### Preset 1: Classic Centered (Default) — `preset-classic`
**Current default.** No changes needed.
```
.gslider-content-inner-wrapper (text-align: center)
  ├── image (top, centered, circular)
  ├── title
  ├── text
  ├── rating (centered)
  ├── name
  └── designation
```
- **DOM change:** ❌ None
- **New feature required:** ❌ None
- **CSS:** Already exists

---

#### Preset 2: Card with Quote — `preset-card-quote`
**Classic card design with prominent quote icon.**
```
.gslider-content-inner-wrapper
  ├── quoteIcon (top-left, large, decorative)
  ├── text
  ├── rating
  ├── .gslider-author-info-group (CSS flex row)
  │     ├── image (small, left)
  │     └── .gslider-author-meta
  │           ├── name
  │           └── designation
  └── (title hidden by default OR above text)
```
- **DOM change:** ✅ Needs `quoteIcon` element added to `renderMap`
- [x] New feature required: ✅ Quote Icon system (Completed)
- **CSS:** `.preset-card-quote` styles — flex-direction manipulation, author info group via CSS
- **Note:** The "author info group" is achieved via **CSS only** using existing DOM + `contentOrder` reorder

---

#### Preset 3: Minimal Text — `preset-minimal`
**Clean, minimal with just text and attribution.**
```
.gslider-content-inner-wrapper (large typography, centered)
  ├── quoteIcon (subtle, small)
  ├── text (large font, italic)
  ├── .divider (CSS pseudo-element, no DOM)
  ├── name (uppercase, small)
  └── designation (small, muted)
```
- **DOM change:** ❌ None (divider is CSS `::after` pseudo-element)
- [x] New feature required: ✅ Quote Icon (Completed)
- **CSS:** Large text sizing, divider pseudo-element, muted colors
- **Hidden by default:** image, title, rating, companyName

---

#### Preset 4: Side-by-Side — `preset-side-by-side`
**Image on left, content on right (horizontal layout).**
```
.gslider-content-inner-wrapper (CSS Grid: 2 columns)
  ├── image (grid column 1, large, square)
  └── (grid column 2)
        ├── rating
        ├── text
        ├── name
        └── designation
```
- **DOM change:** ❌ None — CSS Grid handles the 2-column layout
- **New feature required:** ❌ None
- **CSS:** CSS Grid `grid-template-columns: auto 1fr`, image spans left column
- **How it works:** The `contentOrder` puts `image` first. CSS Grid places it in column 1 and all other elements in column 2 using `nth-child` or named grid areas.

---

#### Preset 5: Stacked Compact — `preset-compact`
**Compact card with all info visible, good for multi-column carousel.**
```
.gslider-content-inner-wrapper (flex, left-aligned, small padding)
  ├── rating (top)
  ├── text (truncated, 3-4 lines)
  ├── .gslider-author-info-group (flex row)
  │     ├── image (tiny, 40px, circle)
  │     └── .gslider-author-meta
  │           ├── name
  │           ├── designation
  │           └── companyName
  └── reviewDate (bottom, muted)
```
- **DOM change:** ✅ Needs `companyName` and `reviewDate` rendered
- **New feature required:** ✅ Company Name render, Review Date field
- **CSS:** Small padding, truncated text, compact spacing

---

### PRO Presets (7)

---

#### Preset 6: Bubble Chat (Pro) — `preset-bubble`
**Speech bubble design with tail pointing to author.**
```
.gslider-content-inner-wrapper
  ├── .gslider-bubble-wrapper (CSS: bubble shape with ::after tail)
  │     ├── text
  │     └── rating
  └── .gslider-author-info-group (below bubble)
        ├── image (circle)
        ├── name
        └── designation
```
- **DOM change:** ✅ Needs 1 new wrapper: `.gslider-bubble-wrapper` around text+rating
- **This is the ONLY preset requiring a new DOM wrapper element**
- **CSS:** Bubble background, border-radius, `::after` pseudo-element for tail
- **Architecture note:** This preset's DOM wrapper can be conditionally rendered based on `presetStyle === 'preset-bubble'`

---

#### Preset 7: Social Media Style (Pro) — `preset-social`
**Looks like a Twitter/Google review card.**
```
.gslider-content-inner-wrapper
  ├── .gslider-social-header (CSS flex row)
  │     ├── image (small circle)
  │     ├── .gslider-author-meta
  │     │     ├── name
  │     │     └── designation (@handle style)
  │     └── .gslider-platform-icon (Google/Twitter/Facebook SVG)
  ├── text
  ├── rating
  └── reviewDate (bottom, muted)
```
- **DOM change:** ✅ Needs `platformIcon` element + `reviewDate`
- **New feature required:** ✅ New `platformType` attribute (icon-only, no API integration)
- **New attribute:** `platformType: { type: "string", default: "none" }` — values: `none`, `google`, `twitter`, `facebook`, `yelp`, `trustpilot`
- **CSS:** Platform-specific icon colors, social card styling

---

#### Preset 8: Full Background (Pro) — `preset-fullbg`
**Testimonial text overlaid on a full background image.**
```
.gslider-content-wrapper (background-image from per-slide bg)
  └── .gslider-content-inner-wrapper (overlay + padding)
        ├── quoteIcon (large, semi-transparent)
        ├── text (white, large)
        ├── rating (light colors)
        ├── name (white)
        └── designation (semi-transparent white)
```
- **DOM change:** ❌ None — per-slide background already exists in attributes
- **New feature required:** ❌ None — `normalBackgroundImageUrl` already works per item
- **CSS:** Text overlay styles, light-on-dark text, overlay opacity

---

#### Preset 9: Logo + Company Focus (Pro) — `preset-company`
**Emphasizes company logo and name — B2B testimonials.**
```
.gslider-content-inner-wrapper
  ├── companyLogo (large, top)
  ├── rating
  ├── text
  ├── .gslider-author-info-group
  │     ├── image (small)
  │     ├── name
  │     ├── designation
  │     └── companyName
  └── reviewLink (bottom, "View on Google" style link)
```
- **DOM change:** ✅ Needs `companyLogo`, `companyName`, `reviewLink` rendered
- **New feature required:** ✅ Company Logo render, Review Link field
- **CSS:** Large logo display, B2B card styling

---

#### Preset 10: Timeline Style (Pro) — `preset-timeline`
**Vertical timeline with date prominence.**
```
.gslider-content-inner-wrapper (left-aligned)
  ├── reviewDate (large, prominent, date badge style)
  ├── .gslider-timeline-dot (CSS pseudo-element)
  ├── text
  ├── rating
  ├── name
  └── designation
```
- **DOM change:** ❌ None — `.gslider-timeline-dot` is CSS `::before` pseudo-element
- **New feature required:** ✅ Review Date field
- **CSS:** Timeline line (via wrapper `::before`), date badge, dot indicator

---

#### Preset 11: Video Testimonial (Pro) — `preset-video`
**Placeholder for video with author overlay below.**
```
.gslider-content-inner-wrapper
  ├── .gslider-video-wrapper > iframe or video element
  ├── .gslider-author-info-group
  │     ├── image
  │     ├── name
  │     └── designation
  └── quoteHighlight (CSS-styled pull quote)
```
- **DOM change:** ✅ Needs video embed element
- **New feature required:** ✅ Video URL attribute (`videoUrl`), video embed render
- **New attributes:** `videoUrl` (per item), `videoType` (youtube/vimeo/self-hosted)
- **CSS:** Video aspect ratio container, play button overlay
- **Note:** This is a Pro-exclusive feature — significant new development

---

#### Preset 12: Masonry / Multi-Row (Pro) — `preset-masonry`
**Pinterest-style staggered grid (non-Swiper layout).**
```
.gslider-masonry-grid (CSS Grid with auto-rows)
  ├── .gslider-content-wrapper (varying heights)
  │     └── (same inner structure as preset-classic)
  └── ...
```
- **DOM change:** ❌ None — CSS Grid layout on wrapper
- **New feature required:** ✅ Grid/List layout system (from remaining-free-features #7)
- **CSS:** CSS Masonry via `grid-template-rows: masonry` or JS fallback

---

## 🔍 Architecture Impact Assessment

### ✅ What STAYS the Same (No Changes)

| Component | Status |
|-----------|--------|
| `attributes.js` data structure | ✅ Keep — extends naturally |
| `renderMap` + `contentOrder` pattern | ✅ Keep — perfect for presets |
| `handleAddItem` / `handleChangeItem` | ✅ Keep — generic enough |
| `sortableItem.js` per-item editing | ✅ Keep — add new fields |
| `styling.js` dynamic CSS generation | ✅ Keep — add preset-specific rules |
| Swiper.js integration | ✅ Keep — works for slider/carousel |
| Navigation & pagination system | ✅ Keep — universal |

### ✅ What CHANGES (Minor Additions Only)

| Change | Type | Size | Description |
|--------|------|------|-------------|
| Add `presetStyle` attribute | Attribute | 🟢 Small | Single string attribute, default `preset-classic` |
| Add CSS class to wrapper | DOM | 🟢 Small | `${presetStyle}` added to wrapper className |
| Add preset selector in inspector | UI | 🟡 Medium | Visual card selector for choosing presets |
| Add preset-specific CSS | Styles | 🟡 Medium | ~200-400 lines of SCSS per preset |
| Conditional DOM for bubble preset | DOM | 🟢 Small | One `<div>` wrapper, conditionally rendered |

### ❌ What Does NOT Change

- **No new JS files** needed for presets (just CSS + 1 attribute)
- **No new blocks** needed
- **No InnerBlocks migration** needed
- **No save.js breaking changes** — `presetStyle` class is additive
- **No database migration** — backward compatible

---

## 📦 Dependencies — What Must Be Built First

### Before ANY Presets Can Ship

These pending features from `remaining-free-features.md` must be completed first because presets depend on them:

| # | Feature | Needed By Presets | Priority |
|---|---------|-------------------|----------|
| 1 | Company Logo render | Preset 9 (Company) | P2 |
| 2 | Quote Icon system | Presets 2, 3, 8 | ✅ **Done** |
| 3 | Company Name render in content | Presets 5, 9 | P2 |
| 4 | Review Date field | Presets 5, 7, 10 | P2 |
| 5 | Review Link field | Preset 9 | P3 |
| 6 | Grid/List layout system | Preset 12 (Masonry) | P3 |

### Build Order Recommendation

```
Phase 0 (Prerequisites):
  1. Quote Icon system ✅ Completed
  2. Company Name render (data exists, just add to renderMap)
  3. Company Logo render (data exists, just add to renderMap + save.js)

Phase 1 (Free Presets):
  4. Add presetStyle attribute + CSS class to wrapper
  5. Preset 1: Classic (already done, just label it)
  6. Preset 2: Card with Quote
  7. Preset 3: Minimal Text
  8. Preset 4: Side-by-Side
  9. Preset 5: Stacked Compact (needs Review Date)

Phase 2 (Pro Presets):
  10. Preset 6: Bubble Chat (new DOM wrapper)
  11. Preset 7: Social Media Style (needs Platform Icon)
  12. Preset 8: Full Background
  13. Preset 9: Logo + Company Focus (needs Review Link)
  14. Preset 10: Timeline Style
  15. Preset 11: Video Testimonial (major new feature)
  16. Preset 12: Masonry (needs Grid layout system)
```

---

## 🎯 Summary Table

| # | Preset Name | Tier | New DOM? | New Feature? | Complexity |
|---|-------------|------|----------|-------------|------------|
| 1 | Classic Centered | Free | ❌ | ❌ | 🟢 Done |
| 2 | Card with Quote | Free | ❌* | Quote Icon | 🟡 Medium |
| 3 | Minimal Text | Free | ❌ | Quote Icon | 🟢 Small |
| 4 | Side-by-Side | Free | ❌ | ❌ | 🟢 Small |
| 5 | Stacked Compact | Free | ❌ | Review Date | 🟡 Medium |
| 6 | Bubble Chat | Pro | ✅ (1 div) | ❌ | 🟡 Medium |
| 7 | Social Media | Pro | ❌* | Platform Icon | 🟡 Medium |
| 8 | Full Background | Pro | ❌ | ❌ | 🟢 Small |
| 9 | Company Focus | Pro | ❌ | Review Link | 🟡 Medium |
| 10 | Timeline | Pro | ❌ | Review Date | 🟡 Medium |
| 11 | Video Testimonial | Pro | ✅ | Video URL | 🔴 Large |
| 12 | Masonry Grid | Pro | ❌ | Grid Layout | 🔴 Large |

*❌\* = uses new `renderMap` keys but no new wrapper divs*

---

## 💡 Key Insights

1. **Architecture is preset-ready.** The `contentOrder` + `renderMap` pattern was unknowingly designed perfectly for presets. Just add new keys to `renderMap` and CSS handles the rest.

2. **Most presets are CSS-only.** 10 out of 12 presets need zero new DOM wrapper elements — they purely restyle the existing flat DOM structure using CSS Grid/Flexbox.

3. **Only 1 preset needs a new wrapper div** (Bubble Chat). This can be conditionally rendered with `{presetStyle === 'preset-bubble' && <div className="...">}`.

4. **Render unrendered data first.** `companyName`, `companyLogo` data already exists in attributes but isn't rendered. Simply adding them to `renderMap` unlocks 3 presets.

5. **Quote Icon is completed.** This unlocks 3 out of 5 free presets.

6. **Pro upsell is straightforward.** Free presets cover 80% of use cases. Pro adds visual differentiation (Bubble, Social, Video) and data features (Timeline, Company, Masonry).

---

> **This document serves as the research foundation for building presets. No code changes are needed right now — this is a planning reference.**
