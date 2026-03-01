# WordPress PHP Coding Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/
> রাখা হয়েছে: কোডিং-এর সময় দ্রুত reference হিসেবে ব্যবহার করার জন্য

---

## General

### PHP Tags
- সবসময় **full PHP tags** ব্যবহার করুন: `<?php ?>`
- ❌ Shorthand tags ব্যবহার **করবেন না**: `<? ?>` or `<?= ?>`

```php
// ✅ Correct
<?php echo esc_html( $var ); ?>

// ❌ Incorrect
<?= esc_html( $var ) ?>
```

### Quotes
- String-এ কিছু evaluate না হলে **single quotes**
- Alternate quoting style ব্যবহার করুন escape avoid করতে

```php
echo '<a href="/static/link" class="button button-primary">Link name</a>';
echo "<a href='{$escaped_link}'>text with a ' single quote</a>";
```

### require/include
- **Parentheses ব্যবহার করবেন না** — এগুলো language constructs
- `require_once` prefer করুন `include_once` এর বদলে

```php
// ✅ Correct
require_once ABSPATH . 'file-name.php';

// ❌ Incorrect
include_once ( ABSPATH . 'file-name.php' );
require_once __DIR__ . '/file-name.php';
```

---

## Naming Conventions

### Functions, Variables, Actions/Filters
- **Lowercase**, words আলাদা করতে **underscores**
- ❌ Never camelCase
- Abbreviated names avoid করুন

```php
// ✅ Correct
function some_name( $some_variable ) {}

// ❌ Incorrect
function someName( $someVariable ) {}
```

### Classes, Traits, Interfaces, Enums
- **Capitalized words**, underscore separated
- Acronyms ALL CAPS

```php
class Walker_Category extends Walker {}
class WP_HTTP {}
interface Mailer_Interface {}
trait Forbid_Dynamic_Properties {}
enum Post_Status {}
```

### Constants
- ALL UPPER CASE, underscore separated

```php
define( 'DOING_AJAX', true );
```

### File Names
- **Lowercase**, hyphens separate words
- Class files: `class-` prefix, underscores → hyphens

```
my-plugin-name.php
class-wp-error.php        (for class WP_Error)
general-template.php      (template tags in wp-includes)
```

### Dynamic Hooks
- Interpolation ব্যবহার করুন, concatenation না
- Variables curly braces `{}` দিয়ে wrap করুন

```php
// ✅ Correct
do_action( "{$new_status}_{$post->post_type}", $post->ID, $post );

// ❌ Incorrect
do_action( $new_status . '_' . $post->post_type, $post->ID, $post );
```

---

## Whitespace / Space Usage

### Operators
- Commas-এর পর space
- Logical, arithmetic, comparison, assignment operators-এর উভয় পাশে space

```php
SOME_CONST === 23;
foo() && bar();
! $foo;
array( 1, 2, 3 );
$baz . '-5';
$term .= 'X';
```

### Control Structures
- Parentheses-এর ভেতরে space

```php
foreach ( $foo as $bar ) { ... }
if ( $foo && ( $bar || $baz ) ) { ... }
```

### Functions
```php
// Definition — space inside parentheses
function my_function( $param1 = 'foo', $param2 = 'bar' ) { ... }
function my_other_function() { ... }

// Call — space inside parentheses
my_function( $param1, func_param( $param2 ) );
my_other_function();
```

### Array Access
- Variable index → space
- String/numeric index → **no space**

```php
$x = $foo['bar'];     // ✅ Correct — string key, no space
$x = $foo[ 'bar' ];   // ❌ Incorrect
$x = $foo[0];          // ✅ Correct — numeric key, no space
$x = $foo[ 0 ];        // ❌ Incorrect
$x = $foo[ $bar ];     // ✅ Correct — variable key, with space
$x = $foo[$bar];       // ❌ Incorrect
```

### Type Casts
- Lowercase, short form, space after

```php
$foo = (bool) $bar;      // ✅ Correct
$foo = (boolean) $bar;   // ❌ Incorrect
$foo = (int) $count;     // ✅ Correct
$foo = (integer) $count; // ❌ Incorrect
```

### Increment/Decrement
- Operator-ও variable-এর মধ্যে **no space**

```php
// ✅ Correct
for ( $i = 0; $i < 10; $i++ ) {}

// ❌ Incorrect
for ( $i = 0; $i < 10; $i ++ ) {}
```

---

## Formatting

### Brace Style
- Opening brace **same line**
- `elseif` ব্যবহার করুন, `else if` না

```php
if ( condition ) {
	action1();
} elseif ( condition2 ) {
	action2();
} else {
	default_action();
}
```

### Arrays
- Short array syntax ব্যবহার করুন

```php
// ✅ Short syntax
$array = array( 1, 2, 3 );

// Long arrays — one item per line, trailing comma
$array = array(
	'key1' => 'value1',
	'key2' => 'value2',
	'key3' => 'value3',
);
```

### Yoda Conditions
- Constant/literal **বামে** রাখুন comparison-এ

```php
// ✅ Correct (Yoda)
if ( true === $result ) {}
if ( 'value' === $option ) {}

// ❌ Incorrect
if ( $result === true ) {}
```

---

## Control Structures

- `elseif` ব্যবহার করুন (`else if` না)
- সবসময় **braces** ব্যবহার করুন, even single-line statements-এ

```php
// ✅ Correct
if ( $foo ) {
	$bar = true;
}

// ❌ Incorrect
if ( $foo )
	$bar = true;
```

---

## Operators

### Ternary
- সহজ conditions-এ ব্যবহার করুন, complex nesting avoid করুন

```php
$type = ( 'post' === $var ) ? 'is_post' : 'is_page';
```

### Error Control (@)
- ❌ **ব্যবহার করবেন না**

---

## Database

- Direct queries avoid করুন — WordPress APIs ব্যবহার করুন
- Direct query দরকার হলে `$wpdb->prepare()` ব্যবহার করুন

```php
// ✅ Correct
$wpdb->prepare(
	"SELECT * FROM $wpdb->posts WHERE ID = %d AND post_status = %s",
	$id,
	'publish'
);
```

---

## Recommendations

- ❌ **`extract()` ব্যবহার করবেন না**
- Boolean parameters avoid করুন — descriptive string values ব্যবহার করুন
- Regular expressions-এ **PCRE** ব্যবহার করুন (POSIX না)
- Clever code avoid করুন — readable code লিখুন

---

## Quick Checklist

- [ ] snake_case functions/variables?
- [ ] Spaces inside parentheses `( )` for control structures ও functions?
- [ ] Yoda conditions ব্যবহার করেছেন?
- [ ] `elseif` (not `else if`)?
- [ ] Full PHP tags `<?php ?>` (not `<? ?>`)?
- [ ] `require_once` without parentheses?
- [ ] `$wpdb->prepare()` for direct queries?
- [ ] Type casts lowercase ও short form?
- [ ] No `extract()` usage?
