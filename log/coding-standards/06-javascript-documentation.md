# WordPress JavaScript Documentation Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
> রাখা হয়েছে: JS DocBlock লেখার সময় দ্রুত reference হিসেবে

---

## JSDoc Format

WordPress JavaScript documentation JSDoc 3 standard follow করে। সব DocBlock `/**` দিয়ে শুরু।

---

## Function Documentation — Detailed Rules

### Tag-by-Tag Rules:

| Tag | Rule |
|---|---|
| **Summary** | Brief, **one line** explanation. Period at end. |
| **Description** | Supplement to summary, more detail. Period at end. |
| `@deprecated x.x.x` | Only for deprecated functions. **Always 3-digit** (e.g. `@deprecated 3.6.0`). Include replacement function. |
| `@since x.x.x` | **3-digit** for initial (e.g. `@since 3.6.0`). Add more `@since` tags for significant changes (serves as changelog). |
| `@access` | **Only if private.** Private = internal use only, no code reference docs. |
| `@class` | Use for **class constructors**. |
| `@augments` | For class constructors, list **direct parents**. |
| `@mixes` | List **mixins** mixed into the object. |
| `@alias` | Change documented name when function is first assigned to a temp variable. |
| `@memberof` | Namespace containing this function (if JSDoc can't resolve automatically). |
| `@static` | Mark that a function is a **static method** on the class constructor. |
| `@see` | A **function or class** relied on. |
| `@link` | **URL** that provides more information. |
| `@fires` | **Event fired** by the function. Prefix with class name if class-specific. |
| `@listens` | **Events listened for.** Must prefix with event namespace. Class-specific → list class name. |
| `@global` | Marks this as a **global function** in the global namespace. |
| `@param` | Brief description. Denote particulars (optional, default) with JSDoc syntax. Period at end. |
| `@yield` | For **generator functions**. Description of yielded values. Period at end. |
| `@return` | Description of return value. **Period at end.** |

### Full Example:

```javascript
/**
 * Initializes the slider with the given configuration.
 *
 * Sets up Swiper instance, binds event listeners, and
 * configures responsive breakpoints for the slider.
 *
 * @since 1.0.0
 * @since 2.0.0 Added the `options.effect` parameter.
 *
 * @see Swiper For the underlying slider library.
 * @link https://swiperjs.com/api/ Swiper API documentation.
 *
 * @fires Slider#slideChange
 * @listens Slider#init
 *
 * @param {Object}  config             Slider configuration.
 * @param {string}  config.selector    The CSS selector for the slider container.
 * @param {number}  [config.speed=300] Optional. Transition speed in ms. Default 300.
 * @param {string}  [config.effect='slide'] Optional. Transition effect. Accepts
 *                                     'slide', 'fade', 'cube'. Default 'slide'.
 * @param {boolean} [config.loop=false] Optional. Whether to loop. Default false.
 * @return {Object} The initialized Swiper instance.
 */
function initSlider( config ) {
	// ...
}
```

### Deprecated Function Example:

```javascript
/**
 * Initializes the old slider format.
 *
 * @since 1.0.0
 * @deprecated 2.0.0 Use initSlider() instead.
 *
 * @param {Object} options Slider options.
 * @return {Object} The slider instance.
 */
function initOldSlider( options ) {
	// ...
}
```

### Private Function Example:

```javascript
/**
 * Calculates internal slide dimensions.
 *
 * @since 1.0.0
 * @access private
 *
 * @param {number} width  Container width.
 * @param {number} count  Number of slides.
 * @return {number} Width per slide.
 */
function _calculateSlideWidth( width, count ) {
	// ...
}
```

### Generator Function Example:

```javascript
/**
 * Yields slide elements one at a time.
 *
 * @since 2.0.0
 *
 * @param {Array} slides Array of slide data.
 * @yield {Element} The next slide DOM element.
 */
function* slideIterator( slides ) {
	// ...
}
```

---

## Type Annotations

### Primitive Types
| Type | JSDoc |
|---|---|
| String | `{string}` |
| Number | `{number}` |
| Boolean | `{boolean}` |
| Null | `{null}` |
| Undefined | `{undefined}` |
| Symbol | `{symbol}` |

### Complex Types
| Type | JSDoc |
|---|---|
| Object | `{Object}` |
| Array | `{Array}` |
| Array of strings | `{string[]}` |
| Array of objects | `{Object[]}` |
| Function | `{Function}` |
| Promise | `{Promise}` |
| Element | `{Element}` |
| jQuery object | `{jQuery}` |
| Mixed/Any | `{*}` |
| Multiple types | `{string\|number}` |
| Nullable | `{?string}` |
| Non-nullable | `{!string}` |

### Optional Parameters
```javascript
/**
 * @param {string}  name           The name.
 * @param {number}  [count=10]     Optional. The count. Default 10.
 * @param {boolean} [active=false] Optional. Whether active.
 */
```

---

## Class Documentation

### Backbone-style Class (WordPress Media):

```javascript
/**
 * Represents a media attachment view.
 *
 * Handles rendering and interaction for a single
 * media attachment in the media library grid.
 *
 * @since 3.5.0
 *
 * @class
 * @augments wp.media.View
 * @mixes wp.media.selectionSync
 *
 * @param {Object} options Options hash.
 */
const AttachmentView = wp.media.View.extend( {

	/**
	 * The HTML tag name for this view.
	 *
	 * @since 3.5.0
	 *
	 * @type {string}
	 */
	tagName: 'li',

	/**
	 * Initializes the attachment view.
	 *
	 * @since 3.5.0
	 *
	 * @fires AttachmentView#ready
	 *
	 * @param {Object} options View options.
	 * @return {void}
	 */
	initialize: function( options ) {
		// ...
	},

	/**
	 * Returns the template ID for this view.
	 *
	 * @since 3.5.0
	 * @static
	 *
	 * @return {string} The template ID.
	 */
	getTemplateId: function() {
		return 'attachment';
	},
} );
```

---

## ES6+ Class Documentation

```javascript
/**
 * Represents a slider component.
 *
 * @since 1.0.0
 */
class SliderComponent {

	/**
	 * Creates a new SliderComponent.
	 *
	 * @since 1.0.0
	 *
	 * @param {Object} props Component properties.
	 * @param {string} props.id Unique identifier.
	 * @param {number} props.speed Transition speed in ms.
	 */
	constructor( props ) {
		this.id = props.id;
		this.speed = props.speed;
	}

	/**
	 * Initializes the slider.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	init() {
		// ...
	}
}
```

---

## WordPress Block (React Component) Documentation

```javascript
/**
 * Edit component for the testimonial block.
 *
 * Handles the editor-side rendering of testimonial slides
 * with Swiper integration and drag-and-drop reordering.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               Block properties.
 * @param {Object}   props.attributes     Block attributes.
 * @param {Function} props.setAttributes  Attribute setter function.
 * @param {string}   props.clientId       Block client ID.
 * @return {Element} The block edit component.
 */
const Edit = ( { attributes, setAttributes, clientId } ) => {
	// ...
};
```

---

## Event/Hook Documentation

```javascript
/**
 * Fires when the slider changes slides.
 *
 * @since 1.0.0
 *
 * @event Slider#slideChange
 * @type {Object}
 * @property {number} activeIndex The current active slide index.
 * @property {number} previousIndex The previous slide index.
 */
```

---

## File Header

```javascript
/**
 * @file Summary of file purpose.
 *
 * Description of the file (optional).
 *
 * @package GSlider_Blocks
 * @since 1.0.0
 */
```

---

## Inline Comments

```javascript
// Single-line comment with space after //.

/*
 * Multi-line inline comment.
 * Use this for longer explanations.
 */

// Translators: %s is the block name.
const label = sprintf( __( 'Edit %s', 'gslider-blocks' ), blockName );
```

---

## Multi-line Comments (Section Headers)

```javascript
/* ======================================
 * Section: Slider Initialization
 * ====================================== */
```

---

## Object Property Documentation

```javascript
/**
 * Default slider configuration.
 *
 * @since 1.0.0
 *
 * @type {Object}
 * @property {number}  speed         Transition speed in ms.
 * @property {boolean} loop          Whether to loop slides.
 * @property {string}  effect        Transition effect name.
 * @property {Object}  breakpoints   Responsive breakpoint config.
 */
const defaultConfig = {
	speed: 300,
	loop: true,
	effect: 'slide',
	breakpoints: {},
};
```

---

## Quick Checklist

- [ ] প্রতিটা function-এ JSDoc `/** */` আছে?
- [ ] `@since` tag আছে?
- [ ] সব parameters-এ `@param` with `{type}` আছে?
- [ ] Return value documented `@return {type}`?
- [ ] Object parameters-এ dot notation (`param.key`) ব্যবহার করেছেন?
- [ ] Optional params `[param=default]` format-এ?
- [ ] React components-এ props documented?
- [ ] File header DocBlock আছে?
