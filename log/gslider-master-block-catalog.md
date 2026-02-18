# GSlider Blocks — Master Block Catalog & Preset Plan

> **Date:** 2026-02-18
> **Vision:** "World er emon kisu nai ja GSlider diya slider banano jabe na"
> **Target:** 50+ unique blocks, each with multiple DOM variation presets
> **Status:** Future Reference / Long-term Roadmap

---

## 📊 Block Inventory Overview

| Category | Block Count | Free | Pro |
|----------|:-----------:|:----:|:---:|
| ✅ Existing Blocks | 6 | 6 | — |
| Content & Hero | 2 | 1 | 1 |
| Media & Gallery | 6 | 2 | 4 |
| Social Proof & Reviews | 3 | 1 | 2 |
| E-Commerce & Product | 5 | 1 | 4 |
| Team & People | 3 | — | 3 |
| Portfolio & Creative | 4 | 1 | 3 |
| Marketing & CTA | 5 | 1 | 4 |
| Blog & Dynamic Content | 4 | 1 | 3 |
| Data & Stats | 3 | — | 3 |
| Interactive & Engagement | 5 | 1 | 4 |
| Industry-Specific | 8 | — | 8 |
| **TOTAL** | **54** | **15** | **39** |

---

## ✅ EXISTING BLOCKS (Already Built)

### 1. `base` — Content Slider
### 2. `flexi-content` — Flexible Content (InnerBlocks)
### 3. `image-slider` — Image Slider
### 4. `logo-carousel` — Logo Carousel
### 5. `testimonial` — Testimonial Slider
### 6. `flexi-content-item` — Child Block

---

## 🔵 CATEGORY 1: Content & Hero

---

### Block: `base` (EXISTING — Add Presets)

**Presets/Variations:**

#### Preset 1: Content Slider (Free) — Current Default
```
slide > content-wrapper > inner-wrapper > list-item > list-content
  ├── subtitle
  ├── title
  ├── description
  └── buttons
```

#### Preset 2: Hero Banner (Free)
```
slide > content-wrapper.preset-hero > inner-wrapper > list-item > list-content
  ├── .hero-image-wrapper > <img/>       ← foreground image/logo
  ├── subtitle
  ├── title
  ├── description
  └── buttons
```

#### Preset 3: Minimal Text (Free)
```
slide > content-wrapper.preset-minimal > minimal-content
  ├── title
  ├── description
  └── buttons (optional)
```

#### Preset 4: Split Layout (Pro)
```
slide > content-wrapper.preset-split > split-layout
  ├── .split-media (image)
  └── .split-content
        ├── subtitle → title → description → buttons
```

#### Preset 5: Full Image (Pro)
```
slide > content-wrapper.preset-fullimage > fullimage-layout
  ├── .fullimage-media > <img/>
  └── .fullimage-caption (optional)
        ├── title
        └── buttons
```

#### Preset 6: Video Background (Pro)
```
slide > content-wrapper.preset-video > inner-wrapper
  ├── .video-bg-wrapper > <video/> or <iframe/>
  └── .video-content-overlay
        ├── subtitle → title → description → buttons
```

---

### Block: `announcement-bar` (NEW — Free)

Thin horizontal bar slider for site-wide announcements.

**Presets:**

#### Preset 1: Simple Text Bar (Free)
```
announcement-bar > swiper > slide
  └── .announcement-content
        ├── .announcement-icon (optional)
        ├── .announcement-text
        └── .announcement-link
```

#### Preset 2: Countdown Bar (Pro)
```
announcement-bar > swiper > slide
  └── .announcement-content
        ├── .announcement-text
        ├── .countdown-timer (days/hrs/min/sec)
        └── .announcement-cta
```

---

## 🟢 CATEGORY 2: Media & Gallery

---

### Block: `image-slider` (EXISTING — Add Presets)

**New Presets:**

#### Preset 1: Classic Gallery (Free) — Current
```
slide > .image-wrapper > <img/>
  └── .caption (optional)
```

#### Preset 2: Lightbox Gallery (Pro)
```
slide > .image-wrapper
  ├── <img/>
  ├── .lightbox-trigger-icon
  └── .image-caption-overlay
```

#### Preset 3: Masonry Gallery (Pro)
```
slide > .masonry-grid
  ├── .masonry-item > <img/>
  ├── .masonry-item > <img/>
  └── ...
```

---

### Block: `video-slider` (NEW — Pro)

Dedicated video content slider.

#### Preset 1: Embed Player
```
slide > .video-wrapper
  ├── .video-player > <iframe/> (YouTube/Vimeo)
  ├── .video-title
  └── .video-description
```

#### Preset 2: Thumbnail + Lightbox
```
slide > .video-card
  ├── .video-thumbnail > <img/> + .play-button-overlay
  ├── .video-info
  │     ├── .video-title
  │     ├── .video-duration
  │     └── .video-description
  └── (lightbox opens on click)
```

#### Preset 3: Background Video
```
slide > .video-bg-slide
  ├── .video-background > <video autoplay muted loop/>
  └── .video-overlay-content
        ├── title → description → CTA
```

---

### Block: `before-after` (NEW — Pro)

Image comparison slider with draggable divider.

#### Preset 1: Horizontal Compare
```
.before-after-wrapper
  ├── .before-image > <img/>
  ├── .after-image > <img/>
  ├── .comparison-handle (draggable divider)
  ├── .before-label
  └── .after-label
```

#### Preset 2: Vertical Compare
```
Same as above but vertical orientation
```

#### Preset 3: Carousel of Comparisons
```
swiper > slide > .before-after-wrapper (multiple comparisons in carousel)
```

---

### Block: `photo-gallery` (NEW — Free basic / Pro advanced)

Grid-based photo gallery with slider view.

#### Preset 1: Grid Gallery (Free)
```
.gallery-grid
  ├── .gallery-item > <img/> + .gallery-caption
  ├── .gallery-item > <img/> + .gallery-caption
  └── ...
(Click opens fullscreen slider)
```

#### Preset 2: Film Strip (Pro)
```
.film-strip-wrapper
  ├── .main-image > <img/>
  └── .thumbnail-strip (swiper)
        ├── .thumb > <img/>
        └── ...
```

#### Preset 3: Justified Gallery (Pro)
```
.justified-gallery
  ├── .justified-row
  │     ├── <img/> (auto-width based on aspect ratio)
  │     └── ...
  └── ...
```

---

### Block: `3d-slider` (NEW — Pro)

3D transform-based slider effects.

#### Preset 1: Coverflow
```
swiper[effect=coverflow] > slide
  └── .slide-3d-content > <img/> or content
```

#### Preset 2: Cube
```
swiper[effect=cube] > slide
  └── .cube-face > content
```

#### Preset 3: Flip Card
```
swiper[effect=flip] > slide
  └── .flip-card
        ├── .flip-front > <img/>
        └── .flip-back > content
```

---

### Block: `panorama-slider` (NEW — Pro)

360° panoramic image viewer in slider format.

#### Preset 1: Horizontal Pan
```
.panorama-wrapper
  ├── .panorama-viewport > <img/> (overflow hidden, draggable)
  └── .panorama-controls
```

---

## 🟡 CATEGORY 3: Social Proof & Reviews

---

### Block: `testimonial` (EXISTING — Add Presets)

**New Presets:**

#### Preset 1: Classic Card (Free) — Current
```
slide > .testimonial-card
  ├── .author-image
  ├── .quote-text
  ├── .author-name
  └── .author-designation
```

#### Preset 2: Bubble Chat (Pro)
```
slide > .testimonial-bubble
  ├── .chat-bubble
  │     ├── .quote-text
  │     └── .bubble-tail
  └── .author-info
        ├── .author-image
        ├── .author-name
        └── .author-designation
```

#### Preset 3: Video Testimonial (Pro)
```
slide > .video-testimonial
  ├── .video-wrapper > <video/> or <iframe/>
  ├── .author-overlay
  │     ├── .author-image
  │     └── .author-name
  └── .quote-highlight
```

#### Preset 4: Social Media Style (Pro)
```
slide > .social-testimonial
  ├── .social-header
  │     ├── .platform-icon (twitter/google/facebook)
  │     ├── .author-image
  │     └── .author-handle
  ├── .review-stars
  ├── .review-text
  └── .review-date
```

---

### Block: `review-slider` (NEW — Pro)

Star-rating focused reviews with platform integration.

#### Preset 1: Star Review Card
```
slide > .review-card
  ├── .reviewer-info > avatar + name
  ├── .star-rating (1-5 stars)
  ├── .review-title
  ├── .review-text
  └── .review-source (Google, Yelp, etc.)
```

#### Preset 2: Aggregate Score
```
slide > .review-aggregate
  ├── .score-circle (4.8/5)
  ├── .review-summary
  └── .review-breakdown (bars per star level)
```

---

### Block: `social-feed` (NEW — Pro)

Live social media feed slider.

#### Preset 1: Instagram Feed
```
slide > .social-post
  ├── .post-image > <img/>
  ├── .post-stats (likes, comments)
  └── .post-caption
```

#### Preset 2: Twitter/X Feed
```
slide > .tweet-card
  ├── .tweet-header > avatar + handle + date
  ├── .tweet-text
  └── .tweet-stats (retweets, likes)
```

---

## 🟠 CATEGORY 4: E-Commerce & Product

---

### Block: `product-showcase` (NEW — Pro)

WooCommerce-ready product slider.

#### Preset 1: Product Card
```
slide > .product-card
  ├── .product-badge (Sale/New/Hot)
  ├── .product-image > <img/>
  ├── .product-info
  │     ├── .product-category
  │     ├── .product-title
  │     ├── .product-rating (stars)
  │     ├── .product-price
  │     │     ├── .regular-price
  │     │     └── .sale-price
  │     └── .product-cta > Add to Cart button
  └── .quick-view-trigger
```

#### Preset 2: Product Hero
```
slide > .product-hero
  ├── .product-hero-image (large)
  └── .product-hero-content
        ├── .product-title
        ├── .product-features (list)
        ├── .product-price
        └── .product-cta
```

#### Preset 3: Product Comparison
```
slide > .product-compare
  ├── .product-col
  │     ├── <img/>
  │     ├── title
  │     ├── specs-table
  │     └── price + CTA
  └── .product-col (side by side)
```

---

### Block: `pricing-slider` (NEW — Pro)

Pricing table/plan slider.

#### Preset 1: Pricing Card
```
slide > .pricing-card
  ├── .plan-header
  │     ├── .plan-name
  │     ├── .plan-price ($X/mo)
  │     └── .plan-badge (Popular)
  ├── .plan-features
  │     ├── .feature-item (✓/✗ + text)
  │     └── ...
  └── .plan-cta > button
```

#### Preset 2: Pricing Toggle (Monthly/Yearly)
```
.pricing-wrapper
  ├── .billing-toggle (Monthly | Yearly)
  └── swiper > slides (pricing cards)
```

---

### Block: `deal-slider` (NEW — Pro)

Time-limited offer/deal slider.

#### Preset 1: Flash Deal
```
slide > .deal-card
  ├── .deal-image > <img/>
  ├── .deal-badge (% OFF)
  ├── .deal-info
  │     ├── .deal-title
  │     ├── .deal-prices (was/now)
  │     └── .deal-countdown (timer)
  └── .deal-cta
```

---

### Block: `category-slider` (NEW — Free)

Product or post category showcase.

#### Preset 1: Category Card
```
slide > .category-card
  ├── .category-image > <img/>
  ├── .category-overlay
  │     ├── .category-name
  │     └── .category-count (24 items)
  └── .category-link
```

#### Preset 2: Category Circle
```
slide > .category-circle
  ├── .circle-image (border-radius: 50%)
  └── .category-label
```

---

### Block: `brand-slider` (NEW — Free)

Enhanced brand/partner/client logo showcase (upgrade from logo-carousel).

#### Preset 1: Logo Grid Slider (Free)
```
slide > .brand-logo
  ├── <img/> (grayscale → color on hover)
  └── .brand-name (optional)
```

#### Preset 2: Brand Story Card (Pro)
```
slide > .brand-card
  ├── .brand-logo > <img/>
  ├── .brand-name
  ├── .brand-description
  └── .brand-link
```

---

## 🔴 CATEGORY 5: Team & People

---

### Block: `team-slider` (NEW — Pro)

Team member/staff slider.

#### Preset 1: Team Card
```
slide > .team-card
  ├── .member-photo > <img/>
  ├── .member-info
  │     ├── .member-name
  │     ├── .member-role
  │     └── .member-bio
  └── .member-social
        ├── .social-icon (LinkedIn)
        ├── .social-icon (Twitter)
        └── ...
```

#### Preset 2: Team Overlay
```
slide > .team-overlay
  ├── .member-photo > <img/> (full card)
  └── .member-info-overlay (appears on hover)
        ├── .member-name
        ├── .member-role
        └── .member-social
```

#### Preset 3: Team Circle
```
slide > .team-circle
  ├── .member-photo-circle (rounded)
  ├── .member-name
  ├── .member-role
  └── .member-social
```

---

### Block: `profile-slider` (NEW — Pro)

Individual profile/speaker/author slider.

#### Preset 1: Speaker Card
```
slide > .speaker-card
  ├── .speaker-photo
  ├── .speaker-name
  ├── .speaker-title
  ├── .speaker-company
  ├── .speaker-topic
  └── .speaker-social
```

---

### Block: `avatar-slider` (NEW — Pro)

Minimal avatar/user showcase.

#### Preset 1: Avatar Row
```
slide > .avatar-item
  ├── .avatar-image (40-80px circle)
  ├── .avatar-name
  └── .avatar-badge (online/verified)
```

---

## 🟣 CATEGORY 6: Portfolio & Creative

---

### Block: `portfolio-slider` (NEW — Free basic / Pro advanced)

Portfolio/project showcase.

#### Preset 1: Portfolio Card (Free)
```
slide > .portfolio-card
  ├── .portfolio-image > <img/>
  ├── .portfolio-overlay
  │     ├── .portfolio-title
  │     ├── .portfolio-category
  │     └── .portfolio-link
  └── .portfolio-icon (view/link)
```

#### Preset 2: Case Study (Pro)
```
slide > .case-study
  ├── .case-image > <img/>
  └── .case-content
        ├── .case-client
        ├── .case-title
        ├── .case-description
        ├── .case-results (metrics)
        └── .case-link
```

#### Preset 3: Project Timeline (Pro)
```
slide > .project-slide
  ├── .project-image
  ├── .project-info
  │     ├── .project-year
  │     ├── .project-title
  │     └── .project-description
  └── .timeline-connector (line between slides)
```

---

### Block: `timeline-slider` (NEW — Pro)

Horizontal timeline slider.

#### Preset 1: Event Timeline
```
.timeline-wrapper
  ├── .timeline-line (horizontal)
  └── swiper > slide > .timeline-point
        ├── .timeline-date
        ├── .timeline-dot
        ├── .timeline-content
        │     ├── .timeline-title
        │     └── .timeline-description
        └── .timeline-image (optional)
```

---

### Block: `process-slider` (NEW — Pro)

Step-by-step process/workflow slider.

#### Preset 1: Step Cards
```
slide > .process-step
  ├── .step-number (01, 02, 03...)
  ├── .step-icon
  ├── .step-title
  ├── .step-description
  └── .step-connector (arrow to next)
```

#### Preset 2: Process Flow
```
slide > .process-flow-item
  ├── .flow-icon-circle
  ├── .flow-title
  ├── .flow-description
  └── .flow-arrow (→)
```

---

### Block: `showcase-slider` (NEW — Pro)

Feature/service showcase with icons.

#### Preset 1: Icon + Text
```
slide > .showcase-card
  ├── .showcase-icon (SVG/icon font)
  ├── .showcase-title
  ├── .showcase-description
  └── .showcase-link
```

#### Preset 2: Image + Features
```
slide > .showcase-split
  ├── .showcase-image
  └── .showcase-features
        ├── .feature-item > icon + text
        └── ...
```

---

## 🔵 CATEGORY 7: Marketing & CTA

---

### Block: `cta-slider` (NEW — Free)

Call-to-action banner slider.

#### Preset 1: Simple CTA (Free)
```
slide > .cta-banner
  ├── .cta-content
  │     ├── .cta-headline
  │     ├── .cta-subtext
  │     └── .cta-button
  └── .cta-background
```

#### Preset 2: Split CTA (Pro)
```
slide > .cta-split
  ├── .cta-visual > <img/> or illustration
  └── .cta-content > headline + text + button
```

---

### Block: `countdown-slider` (NEW — Pro)

Countdown timer slider for events/sales.

#### Preset 1: Countdown Banner
```
slide > .countdown-slide
  ├── .countdown-timer
  │     ├── .timer-unit (days)
  │     ├── .timer-unit (hours)
  │     ├── .timer-unit (minutes)
  │     └── .timer-unit (seconds)
  ├── .countdown-title
  ├── .countdown-description
  └── .countdown-cta
```

---

### Block: `app-showcase` (NEW — Pro)

Mobile app / SaaS showcase slider.

#### Preset 1: Phone Mockup
```
slide > .app-slide
  ├── .device-mockup
  │     └── .screen-image > <img/> (app screenshot)
  └── .app-info
        ├── .app-title
        ├── .app-description
        ├── .app-features (list)
        └── .store-badges
              ├── .app-store-btn
              └── .play-store-btn
```

#### Preset 2: Feature Spotlight
```
slide > .feature-spotlight
  ├── .device-frame > <img/>
  ├── .feature-pointer (annotation arrow)
  └── .feature-description
```

---

### Block: `newsletter-slider` (NEW — Pro)

Email capture / newsletter signup slider.

#### Preset 1: Signup Banner
```
slide > .newsletter-slide
  ├── .newsletter-visual
  ├── .newsletter-content
  │     ├── .newsletter-headline
  │     ├── .newsletter-description
  │     └── .newsletter-form
  │           ├── input[type=email]
  │           └── submit button
  └── .newsletter-incentive (e.g. "Get 10% off")
```

---

### Block: `banner-rotator` (NEW — Pro)

Advertising / promotion banner rotator.

#### Preset 1: Ad Banner
```
slide > .ad-banner
  ├── .banner-image > <img/> (or full clickable link)
  └── .banner-link
```

#### Preset 2: Rich Banner
```
slide > .rich-banner
  ├── .banner-bg
  ├── .banner-content
  │     ├── .banner-badge
  │     ├── .banner-headline
  │     ├── .banner-offer
  │     └── .banner-cta
  └── .banner-decoration (shapes, patterns)
```

---

## 🟤 CATEGORY 8: Blog & Dynamic Content

---

### Block: `post-slider` (NEW — Free basic / Pro advanced)

Dynamic WordPress post slider.

#### Preset 1: Post Card (Free)
```
slide > .post-card
  ├── .post-thumbnail > <img/>
  ├── .post-meta > date + category
  ├── .post-title
  ├── .post-excerpt
  └── .post-read-more
```

#### Preset 2: Post Overlay (Pro)
```
slide > .post-overlay
  ├── .post-thumbnail-bg (full background)
  └── .post-overlay-content
        ├── .post-category-badge
        ├── .post-title
        ├── .post-meta
        └── .post-read-more
```

#### Preset 3: Magazine Layout (Pro)
```
slide > .magazine-layout
  ├── .featured-post (large, 60%)
  │     ├── <img/>
  │     └── title + meta
  └── .side-posts (40%)
        ├── .small-post > thumb + title
        └── .small-post > thumb + title
```

---

### Block: `news-ticker` (NEW — Pro)

Horizontal scrolling news/updates ticker.

#### Preset 1: Simple Ticker
```
.ticker-wrapper
  ├── .ticker-label (Breaking News)
  └── .ticker-content (marquee/swiper)
        ├── .ticker-item > text + link
        └── ...
```

---

### Block: `content-tabs-slider` (NEW — Pro)

Tabbed content with slider for each tab.

#### Preset 1: Tab + Slider
```
.tabs-wrapper
  ├── .tab-nav
  │     ├── .tab-btn (Tab 1)
  │     ├── .tab-btn (Tab 2)
  │     └── ...
  └── .tab-content
        └── swiper > slides (filtered by active tab)
```

---

### Block: `rss-feed-slider` (NEW — Pro)

External RSS feed content slider.

#### Preset 1: Feed Card
```
slide > .feed-card
  ├── .feed-source-icon
  ├── .feed-title
  ├── .feed-excerpt
  ├── .feed-date
  └── .feed-link
```

---

## ⚫ CATEGORY 9: Data & Stats

---

### Block: `stats-counter` (NEW — Pro)

Animated number counter slider.

#### Preset 1: Counter Card
```
slide > .stat-card
  ├── .stat-icon
  ├── .stat-number (animated count-up)
  ├── .stat-suffix (+, %, K)
  ├── .stat-label
  └── .stat-description (optional)
```

#### Preset 2: Circular Progress
```
slide > .stat-circle
  ├── .progress-ring (SVG circle, animated)
  ├── .stat-number (inside circle)
  └── .stat-label
```

---

### Block: `chart-slider` (NEW — Pro)

Infographic/chart carousel.

#### Preset 1: Chart Card
```
slide > .chart-card
  ├── .chart-title
  ├── .chart-visual (bar/pie/line — SVG)
  ├── .chart-legend
  └── .chart-description
```

---

### Block: `progress-slider` (NEW — Pro)

Progress/skill bar slider.

#### Preset 1: Skill Bars
```
slide > .skill-group
  ├── .skill-item
  │     ├── .skill-label (HTML, CSS, JS...)
  │     ├── .skill-bar
  │     │     └── .skill-fill (width: 90%)
  │     └── .skill-percentage
  └── ...
```

---

## 🟢 CATEGORY 10: Interactive & Engagement

---

### Block: `faq-slider` (NEW — Free basic / Pro)

FAQ accordion in slider format.

#### Preset 1: FAQ Card Slider
```
slide > .faq-card
  ├── .faq-question (toggle)
  └── .faq-answer (expandable)
```

#### Preset 2: FAQ Category Slider
```
slide > .faq-category
  ├── .category-title
  └── .faq-list
        ├── .faq-item > question + answer
        └── ...
```

---

### Block: `story-slider` (NEW — Pro)

Instagram/Facebook stories-style slider.

#### Preset 1: Fullscreen Story
```
.story-slider (vertical fullscreen)
  └── slide > .story-slide
        ├── .story-media > <img/> or <video/>
        ├── .story-progress-bar
        ├── .story-header > avatar + name + time
        └── .story-content (text overlay)
```

---

### Block: `quiz-slider` (NEW — Pro)

Interactive quiz/poll slider.

#### Preset 1: Question Card
```
slide > .quiz-card
  ├── .quiz-question
  ├── .quiz-options
  │     ├── .option-btn (A)
  │     ├── .option-btn (B)
  │     ├── .option-btn (C)
  │     └── .option-btn (D)
  └── .quiz-progress (Q 3/10)
```

---

### Block: `hotspot-slider` (NEW — Pro)

Image with clickable hotspot markers.

#### Preset 1: Hotspot Image
```
slide > .hotspot-slide
  ├── .hotspot-image > <img/>
  └── .hotspot-markers
        ├── .hotspot-point (positioned absolute)
        │     └── .hotspot-tooltip (title + description)
        └── ...
```

---

### Block: `accordion-slider` (NEW — Pro)

Horizontal accordion that expands on hover/click.

#### Preset 1: Horizontal Accordion
```
.accordion-slider
  ├── .accordion-panel (collapsed)
  │     ├── .panel-image > <img/>
  │     └── .panel-title (vertical)
  ├── .accordion-panel.active (expanded)
  │     ├── .panel-image > <img/>
  │     └── .panel-content > title + description + CTA
  └── ...
```

---

## 🔶 CATEGORY 11: Industry-Specific

---

### Block: `property-slider` (NEW — Pro)
Real estate property listing slider.

#### Preset 1: Property Card
```
slide > .property-card
  ├── .property-image > <img/> + .property-badge (For Sale/Rent)
  ├── .property-price ($450,000)
  ├── .property-title
  ├── .property-address
  ├── .property-specs
  │     ├── .spec (🛏 3 Beds)
  │     ├── .spec (🚿 2 Bath)
  │     └── .spec (📐 1,500 sqft)
  └── .property-cta
```

---

### Block: `menu-slider` (NEW — Pro)
Restaurant/food menu slider.

#### Preset 1: Menu Item
```
slide > .menu-item
  ├── .menu-image > <img/>
  ├── .menu-info
  │     ├── .menu-name
  │     ├── .menu-description
  │     ├── .menu-dietary (🌿 Vegan, 🔥 Spicy)
  │     └── .menu-price
  └── .menu-order-btn
```

---

### Block: `destination-slider` (NEW — Pro)
Travel/tourism destination slider.

#### Preset 1: Destination Card
```
slide > .destination-card
  ├── .destination-image > <img/>
  ├── .destination-overlay
  │     ├── .destination-name
  │     ├── .destination-country
  │     ├── .destination-rating (⭐ 4.8)
  │     └── .destination-price (From $999)
  └── .destination-cta
```

---

### Block: `course-slider` (NEW — Pro)
Online course/education slider.

#### Preset 1: Course Card
```
slide > .course-card
  ├── .course-image > <img/>
  ├── .course-badge (Bestseller/New)
  ├── .course-info
  │     ├── .course-title
  │     ├── .course-instructor > avatar + name
  │     ├── .course-stats (⭐ 4.7 · 12K students)
  │     ├── .course-progress (progress bar, if enrolled)
  │     └── .course-price
  └── .course-cta (Enroll Now)
```

---

### Block: `event-slider` (NEW — Pro)
Event listing/schedule slider.

#### Preset 1: Event Card
```
slide > .event-card
  ├── .event-date-badge
  │     ├── .date-month (FEB)
  │     └── .date-day (28)
  ├── .event-image > <img/>
  ├── .event-info
  │     ├── .event-title
  │     ├── .event-location (📍 venue)
  │     ├── .event-time (🕐 7:00 PM)
  │     └── .event-price ($25)
  └── .event-cta (Get Tickets)
```

---

### Block: `service-slider` (NEW — Pro)
Business service/offering slider.

#### Preset 1: Service Card
```
slide > .service-card
  ├── .service-icon (or image)
  ├── .service-title
  ├── .service-description
  ├── .service-features (list)
  └── .service-cta (Learn More)
```

---

### Block: `job-listing-slider` (NEW — Pro)
Job/career listing slider.

#### Preset 1: Job Card
```
slide > .job-card
  ├── .company-logo > <img/>
  ├── .job-info
  │     ├── .job-title
  │     ├── .company-name
  │     ├── .job-location
  │     ├── .job-type (Full-time / Remote)
  │     └── .job-salary ($80K-$120K)
  └── .job-apply-btn
```

---

### Block: `comparison-slider` (NEW — Pro)
Feature/product comparison table slider.

#### Preset 1: Comparison Table
```
slide > .comparison-slide
  ├── .comparison-header > product name + image
  ├── .comparison-features
  │     ├── .feature-row > label + ✓/✗
  │     └── ...
  ├── .comparison-price
  └── .comparison-cta
```

---

## 🎯 EFFECTS & FEATURES (Not Blocks — Applied to Any Block)

These are **feature toggles**, not separate presets:

| Effect | Type | Free/Pro |
|--------|------|----------|
| Ken Burns (zoom/pan on images) | Background effect | Pro |
| Parallax (multi-layer depth) | Scroll effect | Pro |
| Lazy Loading | Performance | Free |
| Autoplay with progress | Animation | Free |
| Mouse-following parallax | Interactive | Pro |
| Particle background | Visual | Pro |
| Animated gradient bg | Visual | Pro |
| Entrance animations | Per-element | Pro |
| Stagger animations | Per-element | Pro |
| Typewriter text effect | Text animation | Pro |

---

## 📊 Release Strategy

### Phase 1 — Foundation (Current + v1.3)
- ✅ Base (existing) + 6 presets
- ✅ Image Slider (existing) + presets
- ✅ Logo Carousel (existing)
- ✅ Testimonial (existing) + presets
- ✅ Flexi Content (existing)

### Phase 2 — Free Growth (v1.4-1.5)
- Announcement Bar
- Post Slider (basic)
- Photo Gallery (basic)
- Category Slider
- CTA Slider
- FAQ Slider (basic)
- Brand Slider

### Phase 3 — Pro Launch (v2.0)
- All existing block Pro presets
- Video Slider
- Before/After
- Product Showcase
- Team Slider
- Pricing Slider
- Countdown Slider
- App Showcase

### Phase 4 — Pro Growth (v2.x-3.0)
- Stats Counter
- Timeline Slider
- Process Slider
- Portfolio Slider
- Story Slider
- News Ticker
- 3D Slider
- Hotspot Slider
- Accordion Slider

### Phase 5 — Industry Packs (v3.x+)
- Property Slider (Real Estate Pack)
- Menu Slider (Restaurant Pack)
- Destination Slider (Travel Pack)
- Course Slider (Education Pack)
- Event Slider (Events Pack)
- Job Listing Slider (HR Pack)
- Service Slider (Business Pack)
- Comparison Slider

---

## 💡 Marketing Angle

> **"54 Blocks. Unlimited Presets. Build any slider imaginable."**

Free: 15 blocks = enough to attract users and rank on WordPress.org
Pro: 39 blocks = compelling upgrade with industry-specific solutions
Industry Packs: Premium add-ons for niche markets

---

## 📁 File Structure (Future)

```
src/blocks/
  ├── base/                    ← 6 presets
  ├── flexi-content/           ← existing
  ├── flexi-content-item/      ← existing
  ├── image-slider/            ← + presets
  ├── logo-carousel/           ← existing
  ├── testimonial/             ← + presets
  ├── announcement-bar/        ← new
  ├── video-slider/            ← new (pro)
  ├── before-after/            ← new (pro)
  ├── photo-gallery/           ← new
  ├── 3d-slider/               ← new (pro)
  ├── panorama-slider/         ← new (pro)
  ├── review-slider/           ← new (pro)
  ├── social-feed/             ← new (pro)
  ├── product-showcase/        ← new (pro)
  ├── pricing-slider/          ← new (pro)
  ├── deal-slider/             ← new (pro)
  ├── category-slider/         ← new
  ├── brand-slider/            ← new
  ├── team-slider/             ← new (pro)
  ├── profile-slider/          ← new (pro)
  ├── avatar-slider/           ← new (pro)
  ├── portfolio-slider/        ← new
  ├── timeline-slider/         ← new (pro)
  ├── process-slider/          ← new (pro)
  ├── showcase-slider/         ← new (pro)
  ├── cta-slider/              ← new
  ├── countdown-slider/        ← new (pro)
  ├── app-showcase/            ← new (pro)
  ├── newsletter-slider/       ← new (pro)
  ├── banner-rotator/          ← new (pro)
  ├── post-slider/             ← new
  ├── news-ticker/             ← new (pro)
  ├── content-tabs-slider/     ← new (pro)
  ├── rss-feed-slider/         ← new (pro)
  ├── stats-counter/           ← new (pro)
  ├── chart-slider/            ← new (pro)
  ├── progress-slider/         ← new (pro)
  ├── faq-slider/              ← new
  ├── story-slider/            ← new (pro)
  ├── quiz-slider/             ← new (pro)
  ├── hotspot-slider/          ← new (pro)
  ├── accordion-slider/        ← new (pro)
  ├── property-slider/         ← new (pro)
  ├── menu-slider/             ← new (pro)
  ├── destination-slider/      ← new (pro)
  ├── course-slider/           ← new (pro)
  ├── event-slider/            ← new (pro)
  ├── service-slider/          ← new (pro)
  ├── job-listing-slider/      ← new (pro)
  └── comparison-slider/       ← new (pro)
```

---

> **This document is a living reference. Update as blocks are built and priorities shift.**
