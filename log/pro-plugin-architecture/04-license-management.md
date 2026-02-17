# GSlider Blocks Pro — License Management System (Freemius)

## 📌 1. Why Freemius

| Feature | Details |
|---------|---------|
| **Pricing** | 7% revenue share (decreasing with volume) |
| **Model** | Revenue sharing — they handle everything |
| **Best For** | Developers who want all-in-one (checkout + licensing + updates) |
| **Key Features** | Checkout, licensing, updates, affiliate system, cart recovery |
| **Integration** | Built-in checkout (they are merchant of record) |
| **Auto Updates** | ✅ Built-in |
| **Analytics** | ✅ Good |
| **SDK** | Feature-rich PHP SDK |
| **Upfront Cost** | 💰 **$0** — No investment needed to start |

> [!IMPORTANT]
> **Freemius is the best choice for zero-budget starts:**
> 1. No upfront cost — 0 tk invest
> 2. They handle payment processing, tax, invoicing
> 3. Built-in checkout page (no need for your own website initially)
> 4. SDK handles everything: licensing, updates, analytics
> 5. Affiliate system built-in for marketing
> 6. Cart abandonment recovery to boost sales

---

## 📌 2. How License Management Works (Technical Flow)

```mermaid
sequenceDiagram
    participant User as WordPress User
    participant Free as Free Plugin
    participant Pro as Pro Plugin
    participant FS as Freemius Server

    User->>FS: 1. Purchases license (Freemius checkout)
    FS->>User: 2. Sends license key via email

    User->>Free: 3. Already has free plugin installed
    User->>Pro: 4. Uploads & activates pro plugin

    Pro->>Pro: 5. Shows "Enter License Key" notice
    User->>Pro: 6. Enters license key

    Pro->>FS: 7. SDK validates license automatically
    FS->>Pro: 8. Response: { valid: true, plan: "pro" }

    Pro->>Pro: 9. Enables pro features

    Note over Pro,FS: Automatic periodic validation by SDK
    Note over Pro,FS: Automatic update checks by SDK
```

---

## 📌 3. Freemius SDK Integration

### Step 1: Create Account & Add Product

1. Go to [freemius.com](https://freemius.com) — Create free account
2. Add your plugin as a product
3. Set up pricing plans
4. Get your plugin ID and public key

### Step 2: Install SDK

Download the Freemius SDK and place it in your pro plugin:

```
gslider-blocks-pro/
├── freemius/          ← Freemius SDK folder
│   ├── start.php
│   ├── includes/
│   └── ...
├── gslider-blocks-pro.php
└── ...
```

### Step 3: Initialize in Pro Plugin

```php
<?php
// PRO PLUGIN: gslider-blocks-pro.php

/**
 * Initialize Freemius SDK.
 */
function gslider_pro_fs() {
    global $gslider_pro_fs;

    if ( ! isset( $gslider_pro_fs ) ) {
        // Include Freemius SDK
        require_once dirname(__FILE__) . '/freemius/start.php';

        $gslider_pro_fs = fs_dynamic_init( array(
            'id'               => 'YOUR_PLUGIN_ID',       // From Freemius dashboard
            'slug'             => 'gslider-blocks-pro',
            'type'             => 'plugin',
            'public_key'       => 'YOUR_PUBLIC_KEY',       // From Freemius dashboard
            'is_premium'       => true,
            'is_premium_only'  => true,
            'has_addons'       => false,
            'has_paid_plans'   => true,
            'menu'             => array(
                'slug'    => 'gslider-pro-license',
                'parent'  => array(
                    'slug' => 'gslider-blocks',            // Under GSlider menu
                ),
            ),
        ) );
    }

    return $gslider_pro_fs;
}

// Initialize Freemius
gslider_pro_fs();

// Signal that SDK was initiated
do_action( 'gslider_pro_fs_loaded' );

// Check license and enable features
if ( gslider_pro_fs()->is_paying() ) {
    define('GSLIDER_PRO_ACTIVE', true);
    // Load pro features
    require_once __DIR__ . '/includes/Plugin.php';
}
```

> [!TIP]
> **Freemius SDK handles automatically:**
> - License key entry page (UI) ✅
> - License activation/deactivation ✅
> - License validation (periodic) ✅
> - Auto-updates ✅
> - Usage analytics ✅
> - Deactivation feedback modal ✅
> - Checkout page (hosted by Freemius) ✅
> - Payment processing + tax ✅
> - Subscription management ✅
>
> **You just focus on building the pro features!**

---

## 📌 4. Freemius Helper Functions

```php
<?php
// Check if user has valid pro license
function gslider_is_pro_licensed() {
    return function_exists('gslider_pro_fs') && gslider_pro_fs()->is_paying();
}

// Check specific plan
function gslider_is_plan( $plan_name ) {
    if ( ! function_exists('gslider_pro_fs') ) {
        return false;
    }
    return gslider_pro_fs()->is_plan( $plan_name );
}

// Example usage in pro plugin
if ( gslider_is_pro_licensed() ) {
    // Enable pro features
}

// Plan-based features
if ( gslider_is_plan('agency') ) {
    // Agency-only features like white labeling
}
```

---

## 📌 5. Pricing Plans

Set these up in the Freemius dashboard:

```
┌──────────────────────────────────────────────────┐
│           GSlider Blocks Pro Pricing             │
├──────────────┬───────────────┬───────────────────┤
│   Personal   │   Business    │     Agency        │
│   $39/year   │   $79/year    │    $149/year      │
├──────────────┼───────────────┼───────────────────┤
│ 1 site       │ 5 sites       │ Unlimited sites   │
│ All pro      │ All pro       │ All pro blocks    │
│ blocks       │ blocks        │ White labeling    │
│ 1 year       │ 1 year        │ Priority support  │
│ updates      │ updates       │ 1 year updates    │
│ Email        │ Priority      │                   │
│ support      │ support       │                   │
└──────────────┴───────────────┴───────────────────┘
```

> [!TIP]
> Freemius handles the checkout page, payment processing, and subscription renewal automatically. You don't need WooCommerce or your own website to sell!

---

## 📌 6. Free Plugin Freemius Integration (Optional)

You can also add Freemius SDK to the **free plugin** on wp.org for analytics and in-dashboard upgrade prompts:

```php
<?php
// FREE PLUGIN: gslider-blocks.php (optional)

function gslider_fs() {
    global $gslider_fs;

    if ( ! isset( $gslider_fs ) ) {
        require_once dirname(__FILE__) . '/freemius/start.php';

        $gslider_fs = fs_dynamic_init( array(
            'id'               => 'YOUR_FREE_PLUGIN_ID',
            'slug'             => 'gslider-blocks',
            'type'             => 'plugin',
            'public_key'       => 'YOUR_FREE_PUBLIC_KEY',
            'is_premium'       => false,
            'has_addons'       => true,     // Pro is an addon
            'has_paid_plans'   => false,
            'menu'             => array(
                'slug' => 'gslider-blocks',
            ),
        ) );
    }

    return $gslider_fs;
}

gslider_fs();
```

> [!CAUTION]
> Adding Freemius SDK to the free plugin is **optional**. Some wp.org reviewers may ask questions about SDK data collection. You can always add it later after the pro plugin is ready.
