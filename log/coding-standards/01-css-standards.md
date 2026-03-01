# WordPress CSS Coding Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/
> রাখা হয়েছে: কোডিং-এর সময় দ্রুত reference হিসেবে ব্যবহার করার জন্য

---

## Structure

- **Tabs ব্যবহার করুন**, spaces না
- Sections-এর মধ্যে **২টা blank line**, blocks-এর মধ্যে **১টা blank line**
- প্রতিটা selector আলাদা line-এ
- Property-value pairs আলাদা line-এ, ১ tab indent
- Closing brace opening selector-এর সাথে flush left

```css
/* ✅ Correct */
#selector-1,
#selector-2,
#selector-3 {
	background: #fff;
	color: #000;
}

/* ❌ Incorrect */
#selector-1, #selector-2, #selector-3 {
	background: #fff; color: #000;
}
```

---

## Selectors

- **Lowercase** ব্যবহার করুন, words আলাদা করতে **hyphens** (`-`)
- ❌ Avoid camelCase, underscores
- ❌ Avoid over-qualification (`div.container` → `.container`)
- Human readable names ব্যবহার করুন
- Attribute selectors-এ **double quotes** ব্যবহার করুন

```css
/* ✅ Correct */
#comment-form {
	margin: 1em 0;
}
input[type="text"] {
	line-height: 1.1;
}

/* ❌ Incorrect */
#commentForm { }     /* No camelCase */
#comment_form { }    /* No underscores */
div#comment_form { } /* No over-qualification */
```

---

## Properties

- Property-র পর colon + space
- সব lowercase (font names ছাড়া)
- Hex code ব্যবহার করুন (`#fff`, `#000`), shorten যেখানে সম্ভব
- `rgba()` শুধু opacity দরকার হলে
- Shorthand ব্যবহার করুন: `background`, `border`, `font`, `margin`, `padding`

```css
/* ✅ Correct */
#selector-1 {
	background: #fff;
	display: block;
	margin: 0;
	margin-left: 20px;
}

/* ❌ Incorrect */
#selector-1 {
	background:#FFFFFF;
	display: BLOCK;
	margin-left: 20PX;
}
```

### Property Ordering

Group by meaning, order within groups:
1. **Display**
2. **Positioning**
3. **Box model**
4. **Colors and Typography**
5. **Other**

TRBL order: Top → Right → Bottom → Left

```css
#overlay {
	position: absolute;
	z-index: 1;
	padding: 10px;
	background: #fff;
	color: #777;
}
```

### Vendor Prefixes

Longest (`-webkit-`) to shortest (unprefixed). Use Autoprefixer.

```css
.sample-output {
	-webkit-box-shadow: inset 0 0 1px 1px #eee;
	-moz-box-shadow: inset 0 0 1px 1px #eee;
	box-shadow: inset 0 0 1px 1px #eee;
}
```

---

## Values

- Colon-এর পর **space**
- Parentheses-এ space **padding করবেন না**
- সবসময় **semicolon** দিয়ে শেষ করুন
- **Double quotes** ব্যবহার করুন (font names, `content` property)
- Font weights **numeric** দিন: `400` (normal), `700` (bold)
- `0` values-এ **unit দিবেন না**: `margin: 0;` (not `0px`)
- Line-height **unit-less** রাখুন: `line-height: 1.4;` (not `1.4em`)
- Decimal values-এ **leading zero**: `0.5` (not `.5`)

```css
/* ✅ Correct */
.class {
	background-image: url(images/bg.png);
	font-family: "Helvetica Neue", sans-serif;
	font-weight: 700;
	line-height: 1.4;
	text-shadow:
		0 -1px 0 rgba(0, 0, 0, 0.5),
		0 1px 0 #fff;
}

/* ❌ Incorrect */
.class {
	background:#fff
	margin: 0px 0px 20px 0px;
	font-weight: bold;
	line-height: 1.4em;
}
```

---

## Media Queries

- Bottom of stylesheet-এ group করুন
- Rule sets **১ level indent** করুন

```css
@media all and (max-width: 699px) and (min-width: 520px) {

	/* Your selectors */

}
```

---

## Commenting

- **Comment liberally** — file size concern হলে minification ব্যবহার করুন
- Line length ৮০ characters-এ manually break করুন
- Table of contents ব্যবহার করুন বড় stylesheets-এ

```css
/**
 * #.# Section title
 *
 * Description of section.
 */
.selector {
	float: left;
}

/* This is an inline comment about this selector */
.another-selector {
	position: absolute;
	top: 0 !important; /* Explain why !important */
}
```

---

## Best Practices

- Fix করতে গেলে **আগে code remove** করুন, তারপর add
- ❌ **Magic Numbers** avoid করুন (`.box { margin-top: 37px }`)
- Element **directly target** করুন, parent দিয়ে না
- `height` শুধু outside elements (images) include করার সময়, otherwise `line-height`
- Default values restate **করবেন না** (`display: block` on block elements)
