# WordPress PHP Inline Documentation Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/inline-documentation-standards/php/
> রাখা হয়েছে: DocBlock লেখার সময় দ্রুত reference হিসেবে

---

## DocBlock Format

সব DocBlock `/**` দিয়ে শুরু, `*/` দিয়ে শেষ। প্রতিটা line ` * ` দিয়ে শুরু।

---

## File Header DocBlock

প্রতিটা PHP file-এর শুরুতে:

```php
<?php
/**
 * Summary of the file.
 *
 * Description of the file (optional).
 *
 * @package Package_Name
 * @subpackage Subpackage_Name (optional)
 * @since x.x.x
 */
```

---

## Function/Method DocBlock — Detailed Rules

### Tag-by-Tag Rules:

| Tag | Rule |
|---|---|
| **Summary** | Brief, **one sentence**, max **two lines**. Period at end. |
| **Description** | Supplement to summary, more detail. Period at end of sentences. |
| `@ignore` | Element meant only for **internal use**, skip from parsing. |
| `@since` | **Always 3-digit**: `@since 3.9.0` (not `@since 3.9`). Exception: `@since MU (3.0.0)`. |
| `@access` | **Only for core-only** functions/classes implementing "private" core APIs. |
| `@see` | Reference to a **function, method, or class** that is heavily relied on. |
| `@link` | **External URL** only. ❌ **Never** use to reference another function/hook/class — use `@see`. |
| `@global` | List PHP globals used. Multiple globals → **align by type, variable, description**. |
| `@param` | Say **"Optional."** before description for optional params. Include **accepted values** and **default**. Period at end. |
| `@return` | Include **all possible return types** with description. Period at end. ❌ **`@return void` should not be used** (except bundled themes and PHP compat shims). |

### Full Example:

```php
/**
 * Retrieves the post type label for display.
 *
 * Returns the appropriate label for the given post type.
 * Falls back to the post type name if no label is found.
 *
 * @since 1.0.0
 * @since 2.0.0 Added the `$context` parameter.
 * @since 2.1.0 Now returns WP_Error on invalid post type.
 *
 * @see get_post_type_object() For the full post type object.
 * @link https://developer.wordpress.org/reference/functions/get_post_type_labels/
 *
 * @global wpdb  $wpdb   WordPress database abstraction object.
 * @global array $wp_post_types List of post types.
 *
 * @param string $post_type The post type slug. Accepts 'post', 'page',
 *                          or any registered custom post type.
 * @param string $context   Optional. The display context. Accepts 'display',
 *                          'edit', or 'raw'. Default 'display'.
 * @return string|WP_Error The label string, or WP_Error on failure.
 */
function get_post_type_label( $post_type, $context = 'display' ) {
	// ...
}
```

### ❌ Common Mistakes:

```php
// ❌ WRONG: Summary too long (must be one sentence, max two lines)
/**
 * This function gets the post type and then checks if it exists
 * in the database and if it does then it returns the label that
 * is associated with it for display purposes.
 */

// ❌ WRONG: @since not 3-digit
/** @since 3.9 */     // Wrong — use @since 3.9.0

// ❌ WRONG: @link used to reference a function
/** @link get_option() */  // Wrong — use @see get_option()

// ❌ WRONG: @param missing "Optional." and default
/** @param string $context The context. */  // Wrong for optional param

// ✅ RIGHT: @param with Optional and default
/** @param string $context Optional. The context. Accepts 'edit', 'display'. Default 'display'. */

// ❌ WRONG: @return void (not for plugins)
/** @return void */
```

---

## Class DocBlock

```php
/**
 * Summary of the class.
 *
 * Description of the class (optional).
 *
 * @since 1.0.0
 */
class My_Class {

	/**
	 * Summary of property.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $property = '';

	/**
	 * Summary of method.
	 *
	 * @since 1.0.0
	 *
	 * @param string $param Description.
	 * @return bool Description.
	 */
	public function my_method( $param ) {
		// ...
	}
}
```

---

## Hook (Action/Filter) DocBlock

### do_action()
```php
/**
 * Fires after the post has been saved.
 *
 * @since 1.0.0
 *
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 * @param bool    $update  Whether this is an update.
 */
do_action( 'save_post', $post_id, $post, $update );
```

### apply_filters()
```php
/**
 * Filters the post title.
 *
 * @since 1.0.0
 *
 * @param string $title   The post title.
 * @param int    $post_id The post ID.
 * @return string Filtered post title.
 */
$title = apply_filters( 'the_title', $title, $post_id );
```

---

## @param Tag Rules

### Format
```
@param type $variable Description.
```

### Type Variations
| Type | Usage |
|---|---|
| `string` | Text values |
| `int` | Integer numbers |
| `float` | Decimal numbers |
| `bool` | `true` or `false` |
| `array` | Arrays |
| `array<string, int>` | Associative arrays with known key/value types |
| `object` | Generic objects |
| `WP_Post` | Specific class instances |
| `callable` | Callbacks |
| `mixed` | Multiple types (avoid if possible) |
| `string\|int` | Multiple specific types (pipe separated) |
| `string\|false` | String or false on failure |
| `null` | Explicitly null |
| `void` | No return value (**avoid in plugins** — only for bundled themes/core shims) |

### Optional Parameters
```php
/**
 * @param int $count Optional. Number of items. Default 10.
 */
```

### Array Parameters (Complex)
```php
/**
 * @param array $args {
 *     Optional. Array of arguments.
 *
 *     @type string $title   The title. Default ''.
 *     @type int    $count   The count. Default 0.
 *     @type bool   $active  Whether active. Default false.
 * }
 */
```

---

## @return Tag Rules

- সব possible return types include করুন
- প্রতিটা type-এর description দিন, period দিয়ে শেষ করুন
- ❌ **`@return void` ব্যবহার করবেন না** (শুধু bundled themes ও PHP compat shims ছাড়া)

```php
// ✅ Correct examples:
/** @return string The formatted date. */
/** @return string|false The value, or false on failure. */
/** @return array<string, string> Array of key-value pairs. */
/** @return int|WP_Error The post ID on success, WP_Error on failure. */

// ❌ Incorrect (avoid in plugins):
/** @return void */
```

---

## @since Tag

- প্রতিটা function, class, method, property, hook-এ **required**
- Updates track করতে multiple `@since` tags:

```php
/**
 * @since 1.0.0
 * @since 2.0.0 Added the `$option` parameter.
 * @since 3.0.0 Changed return type to include WP_Error.
 */
```

---

## Other Important Tags

| Tag | Purpose | ⚠️ Rule | Example |
|---|---|---|---|
| `@see` | Reference function/method/class | Use for code references **only** | `@see get_option()` |
| `@link` | External URL | ❌ **Never** for function/class refs | `@link https://example.com` |
| `@global` | PHP globals used | **Align** type, var, desc if multiple | `@global wpdb $wpdb` |
| `@var` | Property type | | `@var string` |
| `@throws` | Exception thrown | | `@throws Exception` |
| `@deprecated` | Deprecated since | 3-digit version | `@deprecated 3.0.0 Use new_function()` |
| `@access` | Visibility | **Core-only** private APIs | `@access private` |
| `@ignore` | Skip from parsing | **Internal use** elements only | `@ignore` |

---

## Inline Comments

```php
// Single-line inline comment.

/* Multi-line inline comment.
   Second line. */

// Translators: %s is the post title.
printf( __( 'Edit "%s"', 'textdomain' ), $title );
```

---

## Quick Checklist

- [ ] প্রতিটা function-এ DocBlock আছে?
- [ ] `@since` tag আছে?
- [ ] সব parameters-এ `@param` tag আছে?
- [ ] Return value documented (`@return`)?
- [ ] Hooks (action/filter) documented?
- [ ] Optional parameters "Optional." ও default value উল্লেখ করেছেন?
- [ ] Complex array params-এ `@type` ব্যবহার করেছেন?
- [ ] Aligned `@param` types ও names?
