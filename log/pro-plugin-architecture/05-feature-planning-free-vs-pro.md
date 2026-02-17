# GSlider Blocks Pro — Feature Planning: Free vs Pro

## 📌 1. Current Free Blocks & Their Pro Extensions

### Base Slider (`gslider/base-slider`)

| Feature | Free ✅ | Pro 🔒 |
|---------|---------|--------|
| Basic slide types (image, content) | ✅ | |
| Navigation arrows | ✅ | |
| Pagination dots | ✅ | |
| Autoplay | ✅ | |
| Slide speed control | ✅ | |
| Loop/infinite | ✅ | |
| Responsive columns | ✅ | |
| Basic transition (slide) | ✅ | |
| **Advanced transitions** (fade, cube, coverflow, flip, creative) | | 🔒 |
| **Parallax effect** | | 🔒 |
| **Ken Burns effect** | | 🔒 |
| **Auto height** | | 🔒 |
| **Thumbs gallery navigation** | | 🔒 |
| **Progress bar pagination** | | 🔒 |
| **Custom CSS per block** | | 🔒 |
| **Conditional display** (show/hide by user role, device, date) | | 🔒 |

### Image Slider (`gslider/image-slider`)

| Feature | Free ✅ | Pro 🔒 |
|---------|---------|--------|
| Image gallery slider | ✅ | |
| Caption overlay | ✅ | |
| Lightbox | ✅ | |
| Navigation & pagination | ✅ | |
| Link to URL | ✅ | |
| **Lightbox gallery** (navigate between images in lightbox) | | 🔒 |
| **Zoom effect** | | 🔒 |
| **Lazy loading placeholders** (blur/skeleton) | | 🔒 |
| **Advanced caption animations** | | 🔒 |
| **Hotspots on images** | | 🔒 |
| **Dynamic content** (show images from custom field, ACF) | | 🔒 |
| **Bulk import from media library** | | 🔒 |

### Logo Carousel (`gslider/logo-carousel`)

| Feature | Free ✅ | Pro 🔒 |
|---------|---------|--------|
| Logo sliding carousel | ✅ | |
| Number of logos per view | ✅ | |
| Autoplay | ✅ | |
| Grayscale/color effect | ✅ | |
| Link per logo | ✅ | |
| **Tooltip on hover** | | 🔒 |
| **Ticker/marquee mode** (continuous scroll) | | 🔒 |
| **Logo carousel from custom post type** | | 🔒 |
| **Advanced hover animations** (flip, scale, bounce) | | 🔒 |
| **Brand showcase layout** (grid + carousel hybrid) | | 🔒 |

### Flexi Content Slider (`gslider/flexi-content`)

| Feature | Free ✅ | Pro 🔒 |
|---------|---------|--------|
| Custom content cards slider | ✅ | |
| Rich text content | ✅ | |
| Image + text combinations | ✅ | |
| Button/CTA | ✅ | |
| **Dynamic content cards** (from posts/CPT) | | 🔒 |
| **Content from ACF/Meta Box fields** | | 🔒 |
| **Advanced card layouts** (overlay, side-by-side) | | 🔒 |
| **Countdown timer cards** | | 🔒 |
| **Pricing table cards** | | 🔒 |

### Testimonial Slider (`gslider/testimonial`)

| Feature | Free ✅ | Pro 🔒 |
|---------|---------|--------|
| Testimonial cards slider | ✅ | |
| Author name, image, designation | ✅ | |
| Star rating | ✅ | |
| Multiple layouts | ✅ | |
| **Schema markup** (review structured data for SEO) | | 🔒 |
| **Review from Google/Yelp** (embed external reviews) | | 🔒 |
| **Video testimonials** | | 🔒 |
| **Masonry testimonial grid** | | 🔒 |
| **Testimonial form** (collect testimonials from visitors) | | 🔒 |
| **Advanced filtering** (by rating, category) | | 🔒 |

---

## 📌 2. Pro-Only New Blocks

These blocks exist ONLY in the pro plugin. **They do NOT exist in the free plugin at all.**

### Tier 1 — Build First (High Demand)

| Block | Description | Priority |
|-------|-------------|----------|
| `gslider-pro/before-after-slider` | Compare two images with a drag handle | ⭐ HIGH |
| `gslider-pro/video-slider` | Video carousel (YouTube, Vimeo, self-hosted) | ⭐ HIGH |
| `gslider-pro/post-carousel` | Show WordPress posts as carousel (auto from query) | ⭐ HIGH |

### Tier 2 — Build Second (Good Value)

| Block | Description | Priority |
|-------|-------------|----------|
| `gslider-pro/product-carousel` | WooCommerce products carousel | 🟡 MEDIUM |
| `gslider-pro/advanced-gallery` | Grid + Masonry + Justified gallery layouts | 🟡 MEDIUM |
| `gslider-pro/team-carousel` | Team member showcase slider | 🟡 MEDIUM |

### Tier 3 — Build Later (Nice to Have)

| Block | Description | Priority |
|-------|-------------|----------|
| `gslider-pro/countdown-slider` | Sliding countdown timers | 🔵 LOW |
| `gslider-pro/timeline-slider` | Horizontal timeline with sliding effect | 🔵 LOW |
| `gslider-pro/tabs-slider` | Tabs with sliding content transition | 🔵 LOW |

---

## 📌 3. Pro Global Features (Apply to ALL Blocks)

These features are not block-specific — they apply across all or many blocks:

| Feature | Description | Impact |
|---------|-------------|--------|
| **Custom CSS** | Per-block custom CSS editor | HIGH |
| **Conditional Display** | Show/hide by: user role, device type, date range, logged-in status | HIGH |
| **Dynamic Content** | Pull content from custom fields (ACF, Meta Box, JetEngine) | HIGH |
| **Advanced Animations** | Entrance animations, scroll animations, hover animations | MEDIUM |
| **Global Styles** | Save and apply style presets across blocks | MEDIUM |
| **Import/Export** | Export block settings, import presets | LOW |
| **White Labeling** | Remove GSlider branding (for agencies) | LOW |

---

## 📌 4. Free Plugin Upsell Points

The free plugin should have tasteful "Pro" indicators (NOT locked features):

### In the Block Inspector

```
┌─────────────────────────────────────┐
│ Slider Settings                     │
│ ├── Speed         [500ms ▼]         │
│ ├── Autoplay      [✓]              │
│ └── Loop          [✓]              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔒 Advanced Animation  [PRO]   │ │
│ │     Parallax, Ken Burns,       │ │
│ │     Cube, Coverflow effects    │ │
│ │     ┌─────────────────────┐    │ │
│ │     │   Upgrade to Pro →  │    │ │
│ │     └─────────────────────┘    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔒 Custom CSS           [PRO]  │ │
│ │     Add custom CSS to this     │ │
│ │     block                      │ │
│ │     ┌─────────────────────┐    │ │
│ │     │   Upgrade to Pro →  │    │ │
│ │     └─────────────────────┘    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### In the Block Inserter

```
GSlider Blocks
├── Base Slider
├── Image Slider
├── Logo Carousel
├── Flexi Content
├── Testimonial
├── ─────────────── 
├── 🔒 Before After Slider [PRO]
├── 🔒 Video Slider [PRO]
├── 🔒 Post Carousel [PRO]
└── 🔒 Product Carousel [PRO]
```

> [!IMPORTANT]
> **wp.org Rule**: You CAN show "Pro" labels and upgrade links. You CANNOT show disabled/locked controls. The pro panels should be information-only with an upgrade link — NOT a grayed-out version of the actual control.

### Implementation in Free Plugin

```javascript
// src/components/ProTeaser.js (FREE PLUGIN)
import { isProActive } from '../utils/pro-helpers';

const ProTeaser = ({ feature, title, description }) => {
    if (isProActive()) {
        return null; // Don't show teaser if Pro is active
    }
    
    return (
        <PanelBody 
            title={`🔒 ${title} [PRO]`} 
            className="gslider-pro-teaser"
            initialOpen={false}
        >
            <p>{description}</p>
            <a 
                href="https://your-website.com/pricing" 
                target="_blank" 
                className="gslider-upgrade-link"
            >
                Upgrade to Pro →
            </a>
        </PanelBody>
    );
};
```

---

## 📌 5. Feature Development Priority Matrix

```
                    HIGH VALUE
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        │  Quick Wins  │  Big Bets    │
        │              │              │
   EASY ├──────────────┼──────────────┤ HARD
        │              │              │
        │  Fill-ins    │  Moonshots   │
        │              │              │
        └──────────────┼──────────────┘
                       │
                    LOW VALUE
```

### Quick Wins (Easy + High Value) — DO FIRST
- Custom CSS per block
- Advanced transition effects
- Progress bar pagination
- Thumbs gallery

### Big Bets (Hard + High Value) — DO SECOND
- Before/After slider block
- Video slider block
- Post carousel block
- Dynamic content integration
- Conditional display

### Fill-Ins (Easy + Lower Value) — DO THIRD
- Advanced hover animations
- Tooltip on hover
- Import/export presets

### Moonshots (Hard + Lower Value) — DO LATER
- Product carousel (WooCommerce)
- External review integration
- Testimonial form builder
- Timeline slider
