# WordPress JavaScript Coding Standards — Quick Reference

> Source: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/
> রাখা হয়েছে: কোডিং-এর সময় দ্রুত reference হিসেবে ব্যবহার করার জন্য

---

## Key Differences from jQuery Standards

- WordPress **single quotation marks** ব্যবহার করে strings-এ
- `case` statements **indented** within `switch`
- Function contents consistently indented
- `!` negation operator-এর পর **space** দিতে হবে

---

## Spacing

- **Tabs** দিয়ে indent (spaces না)
- Line-এর শেষে কোনো whitespace না
- Lines **80 characters** recommended, **100 max** (soft rule)
- `if/else/for/while/try` — সবসময় **braces** ব্যবহার করুন, multiple lines-এ
- `,` ও `;` এর আগে space না
- `?` ও `:` (ternary) — উভয় পাশে space
- `!` negation-এর পর space
- File-এর শেষে new line

### Function Calls ও Arrays — Space Inside

```javascript
// ✅ Correct — spaces inside parentheses and brackets
array = [ a, b ];
foo( arg );
foo( 'string', object );
foo( options, object[ property ] );
prop = object[ 'default' ];
firstArrayElement = arr[ 0 ];
```

### Examples of Good Spacing

```javascript
var i;

if ( condition ) {
	doSomething( 'with a string' );
} else if ( otherCondition ) {
	otherThing( {
		key: value,
		otherKey: otherValue,
	} );
} else {
	somethingElse( true );
}

// WordPress prefers space after ! negation operator
while ( ! condition ) {
	iterating++;
}

for ( i = 0; i < 100; i++ ) {
	object[ array[ i ] ] = someFn( i );
	$( '.container' ).val( array[ i ] );
}

try {
	// Expressions
} catch ( e ) {
	// Expressions
}
```

---

## Object Declarations

```javascript
// ✅ Preferred — trailing commas
var obj = {
	ready: 9,
	when: 4,
	'you are': 15,
};

var arr = [
	9,
	4,
	15,
];

// ✅ Acceptable for small objects
var obj = { ready: 9, when: 4, 'you are': 15 };
var arr = [ 9, 4, 15 ];
```

---

## Semicolons

**সবসময় ব্যবহার করুন।** Automatic Semicolon Insertion (ASI)-এর উপর নির্ভর করবেন না।

---

## Indentation

- **Tabs** ব্যবহার করুন
- Closure-wrapped file-ও indent করুন

```javascript
( function ( $ ) {
	// Expressions indented

	function doSomething() {
		// Expressions indented
	}
} )( jQuery );
```

---

## Variables

- `const` ও `let` ব্যবহার করুন (`var` এর বদলে modern code-এ)
- `const` — যেটা reassign হবে না
- `let` — যেটা reassign হবে

```javascript
// ✅ Correct
const foo = 'bar';
let counter = 0;

// ❌ Avoid (legacy)
var foo = 'bar';
```

---

## Naming Conventions

- **camelCase** ব্যবহার করুন (PHP-এর snake_case থেকে আলাদা!)
- Descriptive কিন্তু excessively long না
- Iterator `i` acceptable

```javascript
// ✅ Correct
var myVariable = 'value';
function calculateTotal() {}

// ❌ Incorrect
var my_variable = 'value';  // No snake_case in JS
var x = 'value';            // Not descriptive
```

### Constants
```javascript
const MAX_RETRIES = 5;
const API_BASE_URL = '/wp-json/';
```

### Classes
```javascript
class MyClassName {}
```

---

## Comments

- Comment-এর আগে **blank line**
- প্রথম letter capitalize, শেষে period (full sentences-এ)
- `//` ও comment text-এর মধ্যে **single space**

```javascript
someStatement();

// Explanation of something complex on the next line.
$( 'p' ).doSomething();

// This is a comment that is long enough to warrant being stretched
// over the span of multiple lines.
```

---

## Equality

**Strict equality (`===`) সবসময় ব্যবহার করুন**, abstract equality (`==`) না।

```javascript
// ✅ Correct
if ( name === 'John' ) {}
if ( count === 0 ) {}

// ❌ Incorrect
if ( name == 'John' ) {}
if ( count == 0 ) {}
```

---

## Type Checks

| Type | Check |
|---|---|
| String | `typeof object === 'string'` |
| Number | `typeof object === 'number'` |
| Boolean | `typeof object === 'boolean'` |
| Object | `typeof object === 'object'` |
| Function | `_.isFunction( object )` |
| Array | `_.isArray( object )` or `Array.isArray( object )` |
| null | `object === null` |
| undefined (global) | `typeof variable === 'undefined'` |
| undefined (local) | `variable === undefined` |

---

## Strings

**Single quotes** ব্যবহার করুন:

```javascript
// ✅ Correct
var myStr = 'strings should be contained in single quotes';

// Escape single quotes:
var quote = 'Note the backslash before the \'single quotes\'';
```

---

## Switch Statements

- `break` প্রতিটা case-এ (except `default`)
- `case` statements **১ tab indent** within switch
- Value return করার বদলে variable set করুন, শেষে return

```javascript
switch ( event.keyCode ) {
	// ENTER and SPACE both trigger x().
	case $.ui.keyCode.ENTER:
	case $.ui.keyCode.SPACE:
		x();
		break;

	case $.ui.keyCode.ESCAPE:
		y();
		break;

	default:
		z();
}
```

---

## Best Practices

- Code শুধু refactor করুন যখন দরকার, "just because we can" না
- Whitespace-only patches **strongly discouraged**
- সব নতুন/updated JS code standards conform করবে ও JSHint pass করবে

---

## Quick Checklist

- [ ] Tabs দিয়ে indent?
- [ ] Single quotes strings-এ?
- [ ] Spaces inside `()` ও `[]`?
- [ ] `===` ব্যবহার করেছেন (`==` না)?
- [ ] Semicolons সব statements-এ?
- [ ] camelCase naming?
- [ ] `!` এর পর space?
- [ ] Trailing commas objects/arrays-এ?
