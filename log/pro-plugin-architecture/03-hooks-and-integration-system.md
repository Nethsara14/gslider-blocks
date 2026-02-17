# GSlider Blocks Pro — Hooks & Integration System

## How Free Plugin Exposes Hooks for Pro

This is the **most critical technical document** — it defines exactly how the Pro plugin communicates with and extends the Free plugin.

---

## 📌 1. PHP Hooks (Server Side)

### Action Hooks — "Events" Pro Can Listen To

Free plugin **fires** these actions. Pro plugin **hooks into** them.

```php
// ===================================================
// FILE: gslider-blocks.php (main plugin file)
// ===================================================

/**
 * Fires after GSlider constants are defined.
 * Pro plugin can define its own constants here.
 */
do_action('gslider_constants_defined');

/**
 * Fires after GSlider plugin is fully initialized.
 * Pro plugin bootstraps itself here.
 */
do_action('gslider_init');
```

```php
// ===================================================
// FILE: includes/Plugin.php
// ===================================================

public function plugins_loaded() {
    // ... existing registrations ...
    
    /**
     * Fires after all free plugin classes are loaded.
     * Pro registers its classes here.
     */
    do_action('gslider_loaded');
    
    /**
     * Fires after all blocks are registered.
     * Pro registers its blocks here.
     */
    do_action('gslider_blocks_registered');
}
```

```php
// ===================================================
// FILE: includes/Classes/RegistrationBlocks.php
// ===================================================

public function register() {
    // ... register free blocks ...
    
    /**
     * Fires after free blocks are registered.
     * Pro registers pro-only blocks here.
     */
    do_action('gslider_after_register_blocks');
}
```

```php
// ===================================================
// FILE: includes/Assets/FrontendAssets.php
// ===================================================

public function register() {
    // ... enqueue free assets ...
    
    /**
     * Fires after free frontend assets are enqueued.
     * Pro enqueues its frontend assets here.
     */
    do_action('gslider_frontend_assets_enqueued');
}
```

```php
// ===================================================
// FILE: includes/Assets/AdminAssets.php
// ===================================================

public function register() {
    // ... enqueue free admin assets ...
    
    /**
     * Fires after free admin/editor assets are enqueued.
     * Pro enqueues its editor scripts/styles here.
     */
    do_action('gslider_admin_assets_enqueued');
}
```

---

### Filter Hooks — "Data" Pro Can Modify

Free plugin **applies filters** to data. Pro plugin **modifies** that data.

```php
// ===================================================
// FILE: includes/Classes/RegistrationBlocks.php
// ===================================================

public function get_blocks() {
    $blocks = [
        'base',
        'image-slider',
        'logo-carousel',
        'flexi-content',
        'flexi-content-item',
        'testimonial',
    ];
    
    /**
     * Filter the list of registered blocks.
     * Pro adds its blocks to this array.
     * 
     * @param array $blocks List of block directory names.
     */
    return apply_filters('gslider_registered_blocks', $blocks);
}
```

```php
// ===================================================
// FILE: includes/Classes/RegistrationCategory.php
// ===================================================

public function register() {
    $categories = [
        [
            'slug'  => 'gslider-blocks',
            'title' => __('GSlider Blocks', 'gslider-blocks'),
        ],
    ];
    
    /**
     * Filter block categories.
     * Pro can add its own category or modify existing.
     * 
     * @param array $categories Block categories.
     */
    $categories = apply_filters('gslider_block_categories', $categories);
}
```

```php
// ===================================================
// FILE: includes/Classes/StyleGenerator.php
// ===================================================

public function generate_styles($block_name, $attributes) {
    $styles = $this->get_base_styles($block_name, $attributes);
    
    /**
     * Filter generated styles for a block.
     * Pro adds its own style rules here.
     * 
     * @param string $styles     Generated CSS string.
     * @param string $block_name Block name.
     * @param array  $attributes Block attributes.
     */
    return apply_filters('gslider_block_styles', $styles, $block_name, $attributes);
}
```

```php
// ===================================================
// Individual Block Render Callbacks
// ===================================================

/**
 * Filter the block's rendered HTML output.
 * Pro can modify/wrap the output.
 * 
 * @param string $output     HTML output.
 * @param array  $attributes Block attributes.
 * @param string $content    Block's inner content.
 * @param string $block_name Block name slug.
 */
$output = apply_filters(
    'gslider_render_block_' . $block_name,  // e.g., gslider_render_block_base
    $output,
    $attributes,
    $content,
    $block_name
);
```

---

## 📌 2. JavaScript Hooks (Editor Side)

### Block Attribute Extension

```javascript
// ===================================================
// PRO: src/extensions/base-slider-pro/pro-attributes.js
// ===================================================

import { addFilter } from '@wordpress/hooks';

/**
 * Add pro attributes to the Base Slider block.
 * Uses the 'blocks.registerBlockType' filter.
 */
addFilter(
    'blocks.registerBlockType',
    'gslider-pro/base-slider/attributes',
    (settings, name) => {
        if (name !== 'gslider/base-slider') {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                
                // Pro Animation Features
                enableParallax: {
                    type: 'boolean',
                    default: false,
                },
                parallaxIntensity: {
                    type: 'number',
                    default: 50,
                },
                customAnimation: {
                    type: 'string',
                    default: 'slide',
                },
                animationDuration: {
                    type: 'number',
                    default: 500,
                },

                // Pro Conditional Display
                conditionalDisplay: {
                    type: 'object',
                    default: {
                        enabled: false,
                        conditions: [],
                    },
                },

                // Pro Custom CSS
                customCSS: {
                    type: 'string',
                    default: '',
                },
            },
        };
    }
);
```

### Inspector Controls Extension

```javascript
// ===================================================
// FREE: src/blocks/base/edit.js (modified)
// ===================================================

import { applyFilters } from '@wordpress/hooks';

const Edit = ({ attributes, setAttributes }) => {
    // ... existing free controls ...
    
    /**
     * Filter: Allow Pro to inject additional inspector controls.
     * 
     * @param {JSX.Element} controls   Default empty fragment.
     * @param {Object}      attributes Block attributes.
     * @param {Function}    setAttributes Setter function.
     * @param {Object}      props      Full block props.
     */
    const proInspectorControls = applyFilters(
        'gslider.baseSlider.inspectorControls',
        null,
        attributes,
        setAttributes,
        props
    );

    return (
        <>
            <InspectorControls>
                {/* Free controls */}
                <PanelBody title="Slider Settings">
                    {/* ... existing free controls ... */}
                </PanelBody>
                
                {/* Pro controls injected here */}
                {proInspectorControls}
            </InspectorControls>
            
            {/* Block content */}
        </>
    );
};
```

```javascript
// ===================================================
// PRO: src/extensions/base-slider-pro/pro-controls.js
// ===================================================

import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

addFilter(
    'gslider.baseSlider.inspectorControls',
    'gslider-pro/base-slider/controls',
    (controls, attributes, setAttributes) => {
        const {
            enableParallax,
            parallaxIntensity,
            customAnimation,
            animationDuration,
            customCSS,
        } = attributes;

        return (
            <>
                {controls}
                
                <PanelBody 
                    title={__('Advanced Animation', 'gslider-blocks-pro')}
                    initialOpen={false}
                    className="gslider-pro-panel"
                >
                    <ToggleControl
                        label={__('Enable Parallax', 'gslider-blocks-pro')}
                        checked={enableParallax}
                        onChange={(value) => setAttributes({ enableParallax: value })}
                    />
                    {enableParallax && (
                        <RangeControl
                            label={__('Parallax Intensity', 'gslider-blocks-pro')}
                            value={parallaxIntensity}
                            onChange={(value) => setAttributes({ parallaxIntensity: value })}
                            min={10}
                            max={100}
                        />
                    )}
                    <SelectControl
                        label={__('Transition Effect', 'gslider-blocks-pro')}
                        value={customAnimation}
                        options={[
                            { label: 'Slide', value: 'slide' },
                            { label: 'Fade', value: 'fade' },
                            { label: 'Cube', value: 'cube' },
                            { label: 'Coverflow', value: 'coverflow' },
                            { label: 'Flip', value: 'flip' },
                            { label: 'Creative', value: 'creative' },
                        ]}
                        onChange={(value) => setAttributes({ customAnimation: value })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Custom CSS', 'gslider-blocks-pro')}
                    initialOpen={false}
                    className="gslider-pro-panel"
                >
                    <textarea
                        value={customCSS}
                        onChange={(e) => setAttributes({ customCSS: e.target.value })}
                        placeholder=".my-slider { color: red; }"
                        rows={6}
                    />
                </PanelBody>
            </>
        );
    }
);
```

### Block Edit Wrapper Extension

```javascript
// ===================================================
// PRO: src/extensions/base-slider-pro/index.js
// ===================================================

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Wrap the block edit component with additional pro functionality.
 * Uses 'editor.BlockEdit' filter.
 */
const withProFeatures = createHigherOrderComponent(
    (BlockEdit) => {
        return (props) => {
            if (props.name !== 'gslider/base-slider') {
                return <BlockEdit {...props} />;
            }

            // Add pro-specific wrapper logic here
            return (
                <div className="gslider-pro-wrapper">
                    <BlockEdit {...props} />
                </div>
            );
        };
    },
    'withGSliderProFeatures'
);

addFilter(
    'editor.BlockEdit',
    'gslider-pro/base-slider/edit',
    withProFeatures
);
```

### Save/Render Extension

```javascript
// ===================================================
// PRO: Extend saved block output
// ===================================================

import { addFilter } from '@wordpress/hooks';

/**
 * Modify the block's saved element for pro features.
 * Uses 'blocks.getSaveElement' filter.
 */
addFilter(
    'blocks.getSaveElement',
    'gslider-pro/base-slider/save',
    (element, blockType, attributes) => {
        if (blockType.name !== 'gslider/base-slider') {
            return element;
        }

        // Add pro-specific data attributes for frontend JS
        if (attributes.enableParallax) {
            return wp.element.cloneElement(element, {
                'data-parallax': 'true',
                'data-parallax-intensity': attributes.parallaxIntensity,
            });
        }

        return element;
    }
);
```

---

## 📌 3. Complete Hook Reference Table

### PHP Action Hooks

| Hook Name | File | Purpose |
|-----------|------|---------|
| `gslider_constants_defined` | `gslider-blocks.php` | After constants defined |
| `gslider_init` | `gslider-blocks.php` | Plugin fully initialized |
| `gslider_loaded` | `includes/Plugin.php` | All classes loaded |
| `gslider_blocks_registered` | `includes/Plugin.php` | After block registration |
| `gslider_after_register_blocks` | `RegistrationBlocks.php` | After free blocks registered |
| `gslider_frontend_assets_enqueued` | `FrontendAssets.php` | Frontend assets ready |
| `gslider_admin_assets_enqueued` | `AdminAssets.php` | Admin/editor assets ready |

### PHP Filter Hooks

| Hook Name | File | Purpose |
|-----------|------|---------|
| `gslider_registered_blocks` | `RegistrationBlocks.php` | Modify block list |
| `gslider_block_categories` | `RegistrationCategory.php` | Modify categories |
| `gslider_block_styles` | `StyleGenerator.php` | Modify generated CSS |
| `gslider_frontend_assets` | `FrontendAssets.php` | Modify frontend asset list |
| `gslider_admin_assets` | `AdminAssets.php` | Modify admin asset list |
| `gslider_render_block_{name}` | Per-block render | Modify block HTML output |

### JavaScript Filter Hooks

| Hook Name | Used By | Purpose |
|-----------|---------|---------|
| `blocks.registerBlockType` | WordPress Core | Extend block attributes |
| `editor.BlockEdit` | WordPress Core | Wrap Edit component |
| `blocks.getSaveElement` | WordPress Core | Modify saved output |
| `gslider.{blockName}.inspectorControls` | Custom (free plugin) | Add inspector panels |
| `gslider.{blockName}.toolbarControls` | Custom (free plugin) | Add toolbar buttons |
| `gslider.{blockName}.editStyles` | Custom (free plugin) | Modify editor styles |

---

## 📌 4. Helper Function (Free Plugin)

```php
// ===================================================
// Add to: gslider-blocks.php
// ===================================================

/**
 * Check if GSlider Blocks Pro is active and licensed.
 * 
 * @return bool True if Pro is active.
 */
function gslider_is_pro_active() {
    return defined('GSLIDER_PRO_ACTIVE') && GSLIDER_PRO_ACTIVE === true;
}

/**
 * Check if a specific pro feature is available.
 * 
 * @param string $feature Feature slug.
 * @return bool True if feature is available.
 */
function gslider_has_pro_feature($feature) {
    return apply_filters('gslider_has_pro_feature', false, $feature);
}
```

```javascript
// ===================================================
// Add to: src/utils/pro-helpers.js (free plugin)
// ===================================================

/**
 * Check if GSlider Pro is active in the editor.
 * Pro plugin sets this via wp_localize_script.
 */
export const isProActive = () => {
    return window?.gsliderProData?.isActive === true;
};

/**
 * Check if a specific pro feature is available.
 */
export const hasProFeature = (feature) => {
    return window?.gsliderProData?.features?.[feature] === true;
};
```

---

## 📌 5. How Pro Plugin Connects

```php
// ===================================================
// PRO PLUGIN: gslider-blocks-pro.php
// ===================================================

// Hook into free plugin's initialization
add_action('gslider_loaded', function() {
    // Pro plugin is now safe to initialize
    GSliderPro\Plugin::getInstance();
});

// ===================================================
// PRO PLUGIN: includes/Plugin.php
// ===================================================

namespace GSliderPro;

class Plugin {
    public function __construct() {
        // Register pro blocks
        add_filter('gslider_registered_blocks', [$this, 'add_pro_blocks']);
        
        // Load pro extensions for free blocks
        add_action('gslider_blocks_registered', [$this, 'load_extensions']);
        
        // Add pro styles
        add_filter('gslider_block_styles', [$this, 'add_pro_styles'], 10, 3);
        
        // Enqueue pro editor scripts
        add_action('gslider_admin_assets_enqueued', [$this, 'enqueue_pro_editor_assets']);
        
        // Enqueue pro frontend scripts
        add_action('gslider_frontend_assets_enqueued', [$this, 'enqueue_pro_frontend_assets']);
        
        // Tell free plugin that Pro is active
        define('GSLIDER_PRO_ACTIVE', true);
    }
    
    public function add_pro_blocks($blocks) {
        $pro_blocks = [
            'before-after-slider',
            'video-slider',
            'product-carousel',
        ];
        return array_merge($blocks, $pro_blocks);
    }
}
```
