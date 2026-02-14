# Testimonial Block - Comprehensive Specification & Strategy

> **Purpose**: Unified document for feature specification, market research, technical strategy, and development roadmap.
> **Last Updated**: February 10, 2026

---

## 📋 Table of Contents
1. [Market Research & Strategy](#-market-research--strategy)
2. [Layout & Theme Options](#-layout--theme-options)
3. [Feature Specification (Free & Pro)](#-feature-specification-free--pro)
4. [Testimonial Form Builder](#-testimonial-form-builder)
5. [Carousel & Slider Settings](#-carousel--slider-settings)
6. [Typography & Styling](#-typography--styling)
7. [Advanced & Pro Features](#-advanced--pro-features)
8. [Roadmap & Success Metrics](#-roadmap--success-metrics)

---

## 📊 Market Research & Strategy

### Market Analysis
| Reason | Impact |
|--------|--------|
| **Most Searched** | "WordPress testimonial slider" = High search volume |
| **Universal Need** | Every business needs social proof |
| **Conversion Booster** | Increases trust & sales |
| **Competitor Gap** | Few good Gutenberg-native testimonial blocks |

### Target Users
- 🏢 Business websites & Agencies
- 🛒 E-commerce stores (WooCommerce)
- 📚 Course creators & Healthcare providers
- 📱 SaaS companies & Portfolio sites

### Competitor Analysis
| Plugin | FREE Features | PRO Price | Rating |
|--------|---------------|-----------|--------|
| Strong Testimonials | Basic | $49 | 4.5★ |
| Jetrail Reviews | Limited | $49 | 4.0★ |
| Easy Testimonials | OK | $39 | 4.2★ |
| **Real Testimonials (Free)** | **Utility-rich** | **$49** | **4.8★** |
| **GSlider (Planned)** | **Feature-rich** | **$49** | **Target: 5★** |

### Revenue Potential
- **Prospective Income**: $2,500 - $5,000 additional revenue.
- **Expected Conversions**: 5% PRO conversion from increased installs (+1,000-2,000 installs).

### Audit Findings (Competitive Comparison)
- **Strong Testimonials**: Offers Star Rating & Company fields in Free. Lacks advanced layouts in Free.
- **Testimonial Slider & Showcase**: Very restrictive. Most layouts and basic settings (Autoplay/Pagination) are Pro-gated.
- **Real Testimonials (Free)**: Offers Slider, Carousel, and Grid for free. **Gaps**: Star Rating display is Pro-only. **Strengths**: Offers Import/Export (JSON/CSV) and Custom CSS/JS for free.
- **Strategy Update**: 
  - We **MUST** offer Star Rating & Company fields in Free (beat Real Testimonials).
  - We should consider adding **Import/Export** to our Free version roadmap to match Real Testimonials' utility.
  - We can differentiate with better Gutenberg-native styling and more Free layouts (like List).

### Pro Version Strategy (Revenue Generation)
To make the PRO version attractive while keeping FREE functional, we will focus on:
1. **Automation**: Google, Facebook, Yelp, and Trustpilot review import.
2. **Video Support**: Self-hosted or YouTube/Vimeo video testimonials with Lightbox.
3. **Form Builder**: Frontend submission form with moderation and reCAPTCHA.
4. **SEO Mastery**: Automatic Schema-LD (AggregateRating) for rich snippets.
5. **Dynamic Filters**: Ajax filtering by categories or ratings.
6. **Advanced Design**: Masonry, Isotope, and 12+ premium themes.

---

## 🎨 Layout & Theme Options

### Available Layouts
| Layout | Version | Description |
|--------|---------|-------------|
| **Slider** | ✅ Free | Single testimonial sliding view |
| **Carousel** | ✅ Free | Multiple testimonials in carousel format |
| **Grid** | ✅ Free | Static grid layout (Columns) |
| **List** | ✅ Free | Vertical list layout (Simple) |
| **Thumbnails Slider** | Pro | Slider with thumbnail navigation |
| **Multi-row** | Pro | Multiple rows carousel |
| **Masonry** | Pro | Pinterest-style masonry layout |
| **Isotope** | Pro | Filterable layout |

### Theme Options
- **Free Themes**:
  - Theme One: Default centered layout.
  - Theme One v2: Variation of theme one.
- **Pro Themes**: 12 additional themes (Theme Two through Fourteen).
- **Pro Thumb Themes**: Specifically for thumbnail slider layouts.

---

## 📋 Feature Specification (Free & Pro)

### 1. Testimonial Content Fields (The "Slide" Data)
| Field | Type | Required | Status | Description |
|-------|------|----------|--------|-------------|
| **Testimonial Title** | Text | Optional | ✅ Done | Short headline for the testimonial |
| **Author Name** | Text | ✅ Yes | ✅ Done | Full name of the author |
| **Testimonial Text** | Textarea | ✅ Yes | ✅ Done | Actual review content |
| **Designation** | Text | Optional | ✅ Done | Job title or role |
| **Author Image** | Image | Optional | ✅ Planned | Avatar/Photo URL & ID (Free in Strong) |
| **Company Name** | Text | Optional | ✅ Done | Organization name (Free in Strong) |
| **Company Logo** | Image | Optional | ✅ Done | Brand logo URL & ID |
| **Rating** | Number | Optional | ✅ Done | Star rating (1-5) (Free in Strong) |
| **Review Date** | Date/Text | Optional | ⏳ Future | Date of the review |
| **Review Link** | URL | Optional | ⏳ Future | Website/Profile link (Free in Strong) |

### 2. Display & Show/Hide Settings (Responsive)
| Element | Toggle | Responsive | Default |
|---------|--------|------------|---------|
| Section Title | ✅ | No | Hide |
| Schema Markup | ✅ | No | Disabled |
| Preloader | ✅ | No | Disabled |
| Average Rating | ✅ | No | Hide (Pro) |
| Author Image | ✅ | Desktop/Tablet/Mobile | Show |
| Author Name | ✅ | Desktop/Tablet/Mobile | Show |
| Designation | ✅ | Desktop/Tablet/Mobile | Show |
| Company Name | ✅ | Desktop/Tablet/Mobile | Hide |
| Company Logo | ✅ | Desktop/Tablet/Mobile | Hide |
| Star Rating | ✅ | Desktop/Tablet/Mobile | Show |
| Review Date | ✅ | Desktop/Tablet/Mobile | Hide |
| Review Link | ✅ | Desktop/Tablet/Mobile | Hide |
| Quote Icon | ✅ | Desktop/Tablet/Mobile | Hide |

### 3. Star Rating & Quote Settings
- **Star Rating Settings**: Max stars (default 5), Allow half stars (Pro), Custom star icons (2 free style, 12 Pro styles), Active/Inactive colors, Responsive Size & Gap.
- **Quote Icon Settings**: Top/Bottom/Both positions, Default/Custom icon, Responsive size, Color & Opacity.

---

## 📝 Testimonial Form Builder

### Form Fields
| Version | Fields |
|---------|--------|
| **Free** | Full Name, Email, Designation, Testimonial Title, Content, Photo, Star Rating, Company Name, Company Website, Submit Button |
| **Pro** | Unlimited Forms, Custom Fields, Groups, Location, Phone, Video Upload, Social Profiles, reCAPTCHA, Schema Markup |

### Form Settings
- **Labels & Messages**: Required notice label, Success/Error messages, Redirect URL.
- **Display**: On-page mode or Popup (Pro). Ajax submission (Pro).
- **Notifications (Pro)**: Admin notification, Reviewer "Thank You" email, Approval notification.
- **Submission Status**: Pending Review (default), Private, Draft, or Auto-Publish (Pro).

---

## 🎢 Carousel & Slider Settings

### Slider Bascis (Free)
- **Controls**: AutoPlay, AutoPlay Delay, Pagination Speed, Pause on Hover, Infinite Loop.
- **Effects**: ✅ Slide, ✅ Fade, ✅ Cube, ✅ Coverflow, ✅ Flip, ✅ Creative, ✅ Cards.
- **Interactions**: Touch Swipe, Mouse Draggable, Free Mode, Mouse Wheel.

### Navigation & Pagination
- **Navigation (Arrows)**: 9 positions (Vertical Outer, Center, etc.), Hide on Mobile, Custom Icons, Navigation Colors & Borders.
- **Pagination**: Bullets, Dynamic, Fraction, Numbers (Standard - Free). Position Inside/Outside.
- **Pro Pagination**: Infinite Scroll, Load More Button (Ajax), Strokes, Scrollbar.


---

## 🔤 Typography & Styling

### Typography Elements
Each element includes: Font Family, Weight, Size, Line Height, Align, Transform, Letter Spacing, Color, and Margin (Responsive).

| Element | Default Font | Default Size | Default Color |
|---------|-------------|--------------|---------------|
| Testimonial Title | Open Sans 700 | 20px | #333333 |
| Testimonial Text | Open Sans Regular | 16px | #333333 |
| Author Name | Open Sans 700 | 16px | #333333 |
| Designation | Open Sans Regular | 16px | #444444 |
| Company Name | Open Sans Regular | 16px | #444444 |
| Review Date | Open Sans Regular | 15px | #444444 |

### Styling Panels
- **Container/Card**: Background (Color/Gradient/Image), Overlay, Border, Radius, Shadow (Normal/Hover), Padding, Min Height.
- **Author Image**: Shape (Circle/Square/Rounded), Background, Padding, Border, Shadow, Lightbox (Pro), Initials Avatars (Free Fallback).

---

## 💎 Advanced & Pro Features

### Advanced Settings (Free)
- Responsive Columns (1-6).
- Item Spacing/Gaps.
- Ordering (Date, Title, ID, Random-Pro).
- Custom ID & CSS Editor.

### Pro Exclusive Features
- **Video Testimonials**: YouTube/Vimeo support with Lightbox/Popup.
- **Multiple Forms / Submission**: Create unlimited collection forms + Front-end user submission.
- **Importers**: Import from Google, Facebook, Yelp, TripAdvisor, WooCommerce.
- **Schema Markup**: Rich Snippets for SEO (Review, AggregateRating).
- **Spam Control**: reCAPTCHA, Honeypot.
- **Dynamic Content**: Import from other post types.
- **Filters**: Ajax live filters by rating or category.
- **Layouts**: Stacked avatars, before/after stories, timeline, Masonry.
- **Extensions**: Role Manager, Mailchimp Integration, Country Selector, Assignment (to Products/Pages).

---

## 🎯 Roadmap & Success Metrics

### Phase 1: Core FREE (Ongoing)
- ✅ Attributes & Basic Structure
- ✅ Field Rename (`testimonialText`, `authorName`)
- [/] Implement remaining Free fields (Rating, Author Image, Company, etc.)
  - ✅ Data Attributes defined
  - [/] Controls in Inspector (Styling panels missing)
  - [/] Controls in Sortable Item (`testimonialTitle` missing)
- [ ] Build 5 layout templates for the card designs.
- [ ] Finalize Styling Panels (Rating, Image, Logo).
- [ ] Implement Testimonial Form (Free version).
- [ ] Release v1.3.0.

### Success Metrics
| Metric | Target |
|--------|--------|
| Block downloads | +500/month |
| Search rankings | Top 5 for "Gutenberg testimonial" |
| User reviews | 4.8+ stars |
| PRO conversions | 5%+ |

---
**Dependencies**: Core Swiper.js integration, Media Library support.
