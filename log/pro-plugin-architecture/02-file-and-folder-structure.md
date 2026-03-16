# GSlider Blocks Pro — File & Folder Structure

## 📦 Free Plugin Structure (gslider-blocks) — CURRENT + MODIFICATIONS

Your current free plugin needs **minimal changes** — just adding hooks/filters so Pro can extend it.

```
gslider-blocks/                              ← FREE PLUGIN (wp.org)
├── gslider-blocks.php                       ← Main plugin file (add hooks)
├── readme.txt                               ← wp.org readme
├── README.md
├── composer.json
├── package.json
├── webpack.config.js
├── webpack.config.admin.js
│
├── includes/
│   ├── Plugin.php                           ← Add do_action('gslider_loaded')
│   ├── Classes/
│   │   ├── RegistrationBlocks.php           ← Add apply_filters('gslider_registered_blocks')
│   │   ├── RegistrationCategory.php         ← Add apply_filters('gslider_block_categories')
│   │   ├── StyleGenerator.php
│   │   ├── FontLoader.php
│   │   └── SupportSVG.php
│   ├── Assets/
│   │   ├── FrontendAssets.php               ← Add apply_filters('gslider_frontend_assets')
│   │   └── AdminAssets.php                  ← Add apply_filters('gslider_admin_assets')
│   ├── Traits/
│   │   └── SingletonTrait.php
│   └── Utils/
│       └── Utils.php
│
├── src/
│   ├── blocks/
│   │   ├── base/                            ← Each block needs JS hooks for Pro
│   │   ├── image-slider/
│   │   ├── logo-carousel/
│   │   ├── flexi-content/
│   │   ├── flexi-content-item/
│   │   └── testimonial/
│   ├── components/                          ← Shared UI components
│   ├── constants/
│   ├── store/                               ← Redux store
│   └── utils/
│
├── build/                                   ← Compiled JS/CSS
├── admin/                                   ← Admin pages
├── assets/
├── languages/
├── vendor/                                  ← Composer dependencies
└── log/                                     ← Strategy documents
```

### What to ADD to Free Plugin:

1. **Hooks in PHP files** (action hooks & filter hooks)
2. **JS filter points** in each block's edit component
3. **A helper function** to check if Pro is active: `gslider_is_pro_active()`
4. **Upsell UI components** (small "Pro" badges, upgrade links — NOT locked features)
5. **A constant** `GSLIDER_PRO_ACTIVE` that Pro sets

---

## 📦 Pro Plugin Structure (gslider-blocks-pro) — NEW PLUGIN

```
gslider-blocks-pro/                          ← PRO PLUGIN (your website only)
├── gslider-blocks-pro.php                   ← Main plugin file
├── readme.txt                               ← Plugin description
├── composer.json
├── package.json
├── webpack.config.js
│
├── includes/
│   ├── Plugin.php                           ← Pro plugin bootstrap
│   │
│   ├── Classes/
│   │   ├── ProBlockRegistration.php         ← Register pro-only blocks
│   │   ├── ProBlockExtensions.php           ← Extend free blocks with pro features
│   │   ├── AdminMenu.php                    ← Pro settings page
│   │   └── ProAssets.php                    ← Pro-specific CSS/JS
│   │
│   ├── License/                             ← ⭐ LICENSE MANAGEMENT
│   │   ├── LicenseManager.php              ← Core license logic
│   │   ├── LicenseAPI.php                   ← API calls to your server
│   │   ├── LicenseAdmin.php                 ← License settings page UI
│   │   └── Updater.php                      ← Auto-update from your server
│   │
│   ├── Extensions/                          ← ⭐ EXTENDS FREE BLOCKS
│   │   ├── BaseSliderPro.php               ← Pro features for Base Slider
│   │   ├── ImageSliderPro.php              ← Pro features for Image Slider
│   │   ├── LogoCarouselPro.php             ← Pro features for Logo Carousel
│   │   ├── FlexiContentPro.php             ← Pro features for Flexi Content
│   │   └── TestimonialPro.php              ← Pro features for Testimonial
│   │
│   ├── Traits/
│   │   └── SingletonTrait.php
│   └── Utils/
│       └── ProUtils.php
│
├── src/                                     ← ⭐ JAVASCRIPT/REACT SOURCE
│   │
│   ├── blocks/                              ← PRO-ONLY BLOCKS
│   │   ├── before-after-slider/             ← New pro block
│   │   │   ├── block.json
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── index.js
│   │   │   ├── inspector.js
│   │   │   ├── styling.js
│   │   │   ├── attributes.js
│   │   │   ├── style.scss
│   │   │   └── editor.scss
│   │   │
│   │   ├── video-slider/                    ← New pro block
│   │   ├── product-carousel/                ← New pro block  
│   │   ├── advanced-gallery/                ← New pro block
│   │   └── post-carousel/                   ← New pro block
│   │
│   ├── extensions/                          ← ⭐ EXTENDS FREE BLOCKS (JS side)
│   │   ├── base-slider-pro/
│   │   │   ├── index.js                     ← addFilter hooks
│   │   │   ├── pro-controls.js              ← Pro inspector controls
│   │   │   ├── pro-attributes.js            ← Additional attributes
│   │   │   └── pro-styling.js               ← Pro-specific styles
│   │   │
│   │   ├── image-slider-pro/
│   │   │   ├── index.js
│   │   │   ├── pro-controls.js
│   │   │   └── pro-attributes.js
│   │   │
│   │   ├── logo-carousel-pro/
│   │   ├── flexi-content-pro/
│   │   └── testimonial-pro/
│   │
│   ├── components/                          ← Pro-specific UI components
│   │   ├── ProBadge.js                      ← "PRO" label component
│   │   ├── LicenseNotice.js
│   │   └── ProPanelBody.js                  ← Panel with pro indicator
│   │
│   └── utils/
│       └── pro-helpers.js
│
├── build/                                   ← Compiled JS/CSS
├── assets/
├── languages/
└── vendor/
```

---

## 📂 Block Structure Pattern (Pro-Only Block Example)

```
src/blocks/before-after-slider/
├── block.json                    ← Block metadata
│   {
│     "name": "gslider-pro/before-after-slider",
│     "title": "Before After Slider",
│     "category": "gslider-blocks",
│     "description": "...",
│     "textdomain": "gslider-blocks-pro",
│     "supports": { ... },
│     "attributes": { ... }
│   }
├── index.js                      ← Block registration
├── edit.js                       ← Editor component
├── save.js                       ← Save/render component
├── inspector.js                  ← Inspector controls
├── attributes.js                 ← Block attributes
├── styling.js                    ← Dynamic styles
├── style.scss                    ← Frontend styles
├── editor.scss                   ← Editor-only styles
└── frontend.js                   ← Frontend JS (if needed)
```

---

## 📂 Extension Structure Pattern (Extending Free Block Example)

```
src/extensions/base-slider-pro/
├── index.js                      ← Entry: hooks into free block
│   // Uses wp.hooks.addFilter to:
│   // 1. Add pro attributes to block
│   // 2. Add pro controls to inspector
│   // 3. Modify block edit wrapper
│   // 4. Modify saved content
│
├── pro-controls.js               ← Additional inspector panels
│   // New PanelBody sections:
│   // - Advanced Animation
│   // - Conditional Display
│   // - Dynamic Content
│   // - Custom CSS
│
├── pro-attributes.js             ← Additional block attributes
│   // { enableParallax, customAnimation, conditionalLogic, ... }
│
└── pro-styling.js                ← Additional style generation
    // Generates CSS for pro-only features
```

---

## 🗂️ Key File Descriptions

### Pro Plugin Main File (`gslider-blocks-pro.php`)

| Purpose | Details |
|---------|---------|
| Plugin header | Name, version, author, requires plugins |
| Dependency check | Verifies free plugin is active |
| Version check | Verifies minimum free version |
| Constants | `GSLIDER_PRO_VERSION`, `GSLIDER_PRO_DIR`, etc. |
| Autoloader | Composer autoloader |
| Bootstrap | Initialize pro plugin |

### License Files

| File | Purpose |
|------|---------|
| `LicenseManager.php` | Core logic: validate, activate, deactivate licenses |
| `LicenseAPI.php` | HTTP calls to your licensing server |
| `LicenseAdmin.php` | Settings page UI for entering license key |
| `Updater.php` | Custom updater: checks your server for new versions |

### Extension Files

| File | Purpose |
|------|---------|
| `BaseSliderPro.php` | PHP hooks to extend base slider (render, attributes, REST) |
| `base-slider-pro/index.js` | JS hooks to extend base slider editor (controls, attributes) |
| `base-slider-pro/pro-controls.js` | React components for pro inspector controls |

---

## 📝 Naming Conventions

| Item | Free Plugin | Pro Plugin |
|------|------------|------------|
| Plugin slug | `gslider-blocks` | `gslider-blocks-pro` |
| Text domain | `gslider-blocks` | `gslider-blocks-pro` |
| PHP namespace | `GSlider\` | `GSliderPro\` |
| Block namespace | `gslider/` | `gslider-pro/` |
| Constants prefix | `GSLIDER_` | `GSLIDER_PRO_` |
| Hook prefix | `gslider_` | `gslider_pro_` |
| CSS prefix | `.gslider-` | `.gslider-pro-` |
| JS filter prefix | `gslider.` | `gsliderPro.` |

---

## ⚠️ Critical: Webpack Config for Component Sharing (Spectra-Style)

GSlider free plugin has **23 custom components** (`ColorControl`, `ResponsiveRangeControl`, `ResponsiveSpacingControl`, `ResponsiveTypographyControl`, etc.) that pro blocks also need.

### How Spectra Solves This

Spectra Pro uses **build-time webpack aliases** to import free plugin's components during compilation. The components get bundled into Pro's own `dist/blocks.js`. At runtime, there's NO cross-plugin dependency — everything is self-contained.

**Evidence:** Spectra Pro's `dist/blocks.js` = **2.5MB** because it re-bundles free plugin's components (BoxShadow: 152 occurrences, Reset: 54, Separator: 51).

### Pro Plugin `webpack.config.js`

```javascript
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Path to free plugin — CRITICAL: adjust based on your directory structure
const FREE_PLUGIN_DIR = path.resolve(__dirname, '../gslider-blocks');

module.exports = {
    ...defaultConfig,
    entry: {
        'blocks': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            ...defaultConfig.resolve.alias,
            // These aliases point to FREE plugin's source directories
            // At build time, webpack bundles these into the Pro JS
            '@Components': path.resolve(FREE_PLUGIN_DIR, 'src/components/'),
            '@Utils': path.resolve(FREE_PLUGIN_DIR, 'src/utils/'),
            '@Constants': path.resolve(FREE_PLUGIN_DIR, 'src/constants/'),
            '@Blocks': path.resolve(FREE_PLUGIN_DIR, 'src/blocks/'),
            '@Store': path.resolve(FREE_PLUGIN_DIR, 'src/store/'),
            '@Controls': path.resolve(FREE_PLUGIN_DIR, 'blocks-config/gslider-controls/'),
            '@Attributes': path.resolve(FREE_PLUGIN_DIR, 'blocks-config/blocks-attributes/'),
        },
    },
};
```

### How Pro Blocks Use Free Components

```javascript
// Pro block: src/blocks/before-after-slider/inspector.js
// Same import syntax as free blocks! No difference!
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import InspectorControl from '@Components/inspector-controls';
```

### Asset Enqueue with Free Plugin Dependency

```php
// Pro plugin: ProAssets.php
wp_enqueue_script(
    'gslider-blocks-pro-editor',
    GSLIDER_PRO_PLUGIN_URL . 'build/blocks.js',
    array_merge(
        $asset_file['dependencies'],
        ['gslider-blocks-editor-js']  // ← Free plugin's editor script handle
    ),
    $asset_file['version'],
    true
);
```

> [!IMPORTANT]
> **Build-time vs Runtime:** Components are imported at BUILD time via webpack aliases, NOT at runtime via `window` globals. The Pro plugin's `build/blocks.js` is self-contained — it works as long as the free plugin is active (for PHP/block registration). The `gslider-blocks-editor-js` dependency ensures the free plugin's editor loads first.

### Trade-offs

| Aspect | Benefit | Cost |
|--------|---------|------|
| **No runtime sharing** | Simple, no `window` globals | Component code duplicated in Pro bundle |
| **Same imports** | Pro devs use same `@Components` syntax | Pro JS file larger (~1-2MB) |
| **Independent builds** | Free and Pro build separately | Must keep alias paths in sync |
