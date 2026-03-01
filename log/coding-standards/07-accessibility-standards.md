# WordPress Accessibility Coding Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/accessibility/
> রাখা হয়েছে: Accessible code লেখার সময় reference হিসেবে

---

## WordPress-এর Commitment

WordPress **WCAG 2.2 Level A এবং Level AA** সব guidelines conform করে। Level AAA encouraged কিন্তু required না।

| Level | কি | WordPress Requirement |
|---|---|---|
| **A** | সবচেয়ে basic accessibility barriers | ✅ **Required** |
| **AA** | Broader reach, more complex | ✅ **Required** |
| **AAA** | Very specific needs | 🟡 Encouraged |

---

## ৪টা মূলনীতি (POUR)

### 1. Perceivable (অনুভবযোগ্য)
ব্যবহারকারী content **দেখতে, শুনতে বা অনুভব** করতে পারবে।

| Guideline | কি করতে হবে | আপনার Plugin-এ |
|---|---|---|
| 1.1 Text Alternatives | Non-text content-এর text alternative | Slider images-এ `alt` text |
| 1.2 Time-based Media | Audio/video-র captions, transcripts | Video slider-এ captions |
| 1.3 Adaptable | Content different ways-এ present করা যাবে | Semantic HTML ব্যবহার |
| 1.4 Distinguishable | Foreground/background আলাদা | Color contrast check |

#### GSlider-এ Implement:
```html
<!-- ✅ Image alt text -->
<img src="slide.jpg" alt="বর্ণনামূলক টেক্সট" />

<!-- ✅ Decorative images -->
<img src="decoration.png" alt="" role="presentation" />

<!-- ✅ Color contrast (4.5:1 minimum for normal text) -->
```

### 2. Operable (ব্যবহারযোগ্য)
ব্যবহারকারী content **navigate ও use** করতে পারবে।

| Guideline | কি করতে হবে | আপনার Plugin-এ |
|---|---|---|
| 2.1 Keyboard Accessible | সব functionality keyboard-এ কাজ করবে | Slider keyboard navigation |
| 2.2 Enough Time | যথেষ্ট সময় দিন | Auto-play pause option |
| 2.3 Seizures | Seizure triggering content avoid | Rapid flashing avoid |
| 2.4 Navigable | Navigation সহজ করুন | Focus management |
| 2.5 Input Modalities | Multiple input methods support | Touch + mouse + keyboard |

#### GSlider-এ Implement:
```javascript
// ✅ Keyboard navigation
swiperConfig = {
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	a11y: {
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		slideLabelMessage: 'Slide {{index}} of {{slidesLength}}',
	},
};

// ✅ Pause auto-play on hover/focus
slider.addEventListener( 'mouseenter', () => slider.autoplay.stop() );
slider.addEventListener( 'mouseleave', () => slider.autoplay.start() );
slider.addEventListener( 'focusin', () => slider.autoplay.stop() );
slider.addEventListener( 'focusout', () => slider.autoplay.start() );
```

### 3. Understandable (বোধগম্য)
Content **clear ও predictable** হবে।

| Guideline | কি করতে হবে | আপনার Plugin-এ |
|---|---|---|
| 3.1 Readable | Clear language | Meaningful labels |
| 3.2 Predictable | Predictable behavior | Consistent navigation |
| 3.3 Input Assistance | Error prevention/correction | Form validation messages |

#### GSlider-এ Implement:
```html
<!-- ✅ Meaningful labels -->
<button aria-label="Go to next slide">→</button>
<button aria-label="Go to previous slide">←</button>

<!-- ✅ Live region for slide changes -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
	Slide 2 of 5
</div>
```

### 4. Robust (মজবুত)
Content **assistive technologies** দিয়ে parse করা যাবে।

| Guideline | কি করতে হবে | আপনার Plugin-এ |
|---|---|---|
| 4.1 Compatible | Valid HTML, ARIA correctly used | Semantic markup |

#### GSlider-এ Implement:
```html
<!-- ✅ Semantic slider structure -->
<section aria-roledescription="carousel" aria-label="Testimonials">
	<div role="group" aria-roledescription="slide" aria-label="1 of 5">
		<!-- slide content -->
	</div>
</section>

<!-- ✅ Screen reader only text -->
<span class="screen-reader-text">Navigate testimonials</span>
```

---

## WordPress-Specific ARIA Patterns

### Slider/Carousel Pattern
```html
<div
	role="region"
	aria-roledescription="carousel"
	aria-label="Testimonial Slider"
>
	<button aria-label="Previous slide">‹</button>
	<button aria-label="Next slide">›</button>

	<div aria-live="off"> <!-- "off" when auto-playing, "polite" when paused -->
		<div
			role="group"
			aria-roledescription="slide"
			aria-label="Slide 1 of 5"
		>
			<!-- Content -->
		</div>
	</div>

	<!-- Pagination -->
	<div role="tablist" aria-label="Slides">
		<button role="tab" aria-selected="true" aria-label="Slide 1">•</button>
		<button role="tab" aria-selected="false" aria-label="Slide 2">•</button>
	</div>
</div>
```

---

## Testing Tools

| Tool | কি করে | Link |
|---|---|---|
| **axe DevTools** | Browser extension, automated testing | [deque.com/axe](https://www.deque.com/axe/) |
| **WAVE** | Visual accessibility evaluation | [wave.webaim.org](https://wave.webaim.org/) |
| **Lighthouse** | Chrome built-in audit | DevTools > Lighthouse |
| **Accessibility Support** | ARIA support check | [a11ysupport.io](https://a11ysupport.io/) |
| **Screen Reader** | Manual testing | NVDA (free), VoiceOver (Mac) |
| **Keyboard only** | Tab navigation test | Tab, Shift+Tab, Enter, Escape |

---

## Authoritative Resources

### Official Standards:
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22)
- [W3C WAI ARIA 1.1](https://www.w3.org/TR/wai-aria/)
- [W3C WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Learning Resources:
- [WebAIM](https://webaim.org/) — Articles and resources
- [Inclusive Components](https://inclusive-components.design) — Accessible component patterns
- [Mozilla Accessibility Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WordPress Accessibility Meetup](https://www.meetup.com/wordpress-accessibility-meetup-group/)
- [WordPress Accessibility Day Conference](https://wpaccessibility.day)

---

## Quick Checklist for GSlider

- [ ] সব images-এ meaningful `alt` text আছে?
- [ ] Slider keyboard দিয়ে navigate করা যায়?
- [ ] Navigation buttons-এ `aria-label` আছে?
- [ ] Auto-play pause button আছে?
- [ ] Color contrast 4.5:1 minimum (normal text)?
- [ ] Screen reader-এ slide change announce হয়?
- [ ] `aria-roledescription="carousel"` ব্যবহার করেছেন?
- [ ] Focus visible (outline) navigating-এর সময়?
- [ ] Touch, mouse, keyboard — সবদিয়ে কাজ করে?
- [ ] axe DevTools দিয়ে test করেছেন?
