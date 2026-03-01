# WordPress HTML Coding Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/html/
> রাখা হয়েছে: কোডিং-এর সময় দ্রুত reference হিসেবে ব্যবহার করার জন্য

---

## Validation

- সব HTML pages [W3C validator](https://validator.w3.org/) দিয়ে verify করুন
- Automation substitute না manual code review-এর

---

## Self-closing Elements

- সব tags properly close করতে হবে
- Self-closing tags-এ forward slash-এর আগে **exactly one space**:

```html
<!-- ✅ Correct -->
<br />
<hr />
<img src="image.png" />

<!-- ❌ Incorrect -->
<br/>
<hr/>
```

---

## Attributes and Tags

- সব tags ও attributes **lowercase**
- Machine-readable values → lowercase
- Human-readable values → proper capitalization

```html
<!-- ✅ For machines -->
<meta http-equiv="content-type" content="text/html; charset=utf-8" />

<!-- ✅ For humans -->
<a href="http://example.com/" title="Description Here">Example.com</a>
```

---

## Quotes

- সব attributes-এ **quotes ব্যবহার করুন** (double or single)
- Boolean attributes-এ value omit করা permitted

```html
<!-- ✅ Correct -->
<input type="text" name="email" disabled="disabled" />
<input type="text" name="email" disabled />

<!-- ❌ Incorrect -->
<input type=text name=email disabled>
<input type="text" name="email" disabled="true" />
```

---

## Indentation

- **Tabs ব্যবহার করুন**, spaces না
- Logical structure reflect করুন
- PHP + HTML mix করলে PHP blocks surrounding HTML-এর সাথে match করুন

```php
<!-- ✅ Correct -->
<?php if ( ! have_posts() ) : ?>
	<div id="post-1" class="post">
		<h1 class="entry-title">Not Found</h1>
		<div class="entry-content">
			<p>Apologies, but no results were found.</p>
			<?php get_search_form(); ?>
		</div>
	</div>
<?php endif; ?>
```

---

## Quick Checklist

- [ ] সব tags properly closed?
- [ ] Self-closing elements-এ space before `/>`?
- [ ] সব attributes lowercase?
- [ ] সব attribute values quoted?
- [ ] Proper indentation with tabs?
- [ ] W3C validation pass?
