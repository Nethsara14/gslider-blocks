# GSlider Blocks Pro — Pro Plugin Main File (Boilerplate Code)

## 📌 The Pro Plugin Main File

This is the **complete boilerplate** for the pro plugin's main file. This is what you'll build when development starts.

---

## `gslider-blocks-pro.php`

```php
<?php
/**
 * Plugin Name:       GSlider Blocks Pro
 * Plugin URI:        https://your-website.com/gslider-blocks-pro
 * Description:       Pro addon for GSlider Blocks — Advanced slider animations, pro blocks, dynamic content, and more.
 * Author:            Noruzzaman
 * Author URI:        https://github.com/noruzzamans/
 * Version:           1.0.0
 * Text Domain:       gslider-blocks-pro
 * Domain Path:       /languages
 * License:           GPLv2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Requires Plugins:  gslider-blocks
 * Requires at least: 6.0
 * Requires PHP:      7.4
 *
 * @package GSlider_Blocks_Pro
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Define Pro plugin constants.
 */
define('GSLIDER_PRO_VERSION', '1.0.0');
define('GSLIDER_PRO_FILE', __FILE__);
define('GSLIDER_PRO_DIR_PATH', plugin_dir_path(__FILE__));
define('GSLIDER_PRO_PLUGIN_URL', plugin_dir_url(__FILE__));
define('GSLIDER_PRO_MINIMUM_FREE_VERSION', '1.1.6');

/**
 * Check for required free plugin.
 */
function gslider_pro_check_requirements() {
    $errors = [];
    
    // Check if free plugin is active
    if (!defined('GSLIDER_VERSION')) {
        $errors[] = sprintf(
            /* translators: %s: plugin name */
            __('%s requires the free version of GSlider Blocks to be installed and activated.', 'gslider-blocks-pro'),
            '<strong>GSlider Blocks Pro</strong>'
        );
    }
    
    // Check minimum free version
    if (defined('GSLIDER_VERSION') && version_compare(GSLIDER_VERSION, GSLIDER_PRO_MINIMUM_FREE_VERSION, '<')) {
        $errors[] = sprintf(
            /* translators: %1$s: required version, %2$s: current version */
            __('GSlider Blocks Pro requires GSlider Blocks version %1$s or higher. You are running version %2$s.', 'gslider-blocks-pro'),
            GSLIDER_PRO_MINIMUM_FREE_VERSION,
            GSLIDER_VERSION
        );
    }
    
    return $errors;
}

/**
 * Display admin notice for missing requirements.
 */
function gslider_pro_admin_notice() {
    $errors = gslider_pro_check_requirements();
    
    if (empty($errors)) {
        return;
    }
    
    echo '<div class="notice notice-error">';
    foreach ($errors as $error) {
        echo '<p>' . wp_kses_post($error) . '</p>';
    }
    
    // Add install/activate button for free plugin
    if (!defined('GSLIDER_VERSION')) {
        $install_url = wp_nonce_url(
            admin_url('update.php?action=install-plugin&plugin=gslider-blocks'),
            'install-plugin_gslider-blocks'
        );
        echo '<p><a href="' . esc_url($install_url) . '" class="button button-primary">';
        echo esc_html__('Install GSlider Blocks (Free)', 'gslider-blocks-pro');
        echo '</a></p>';
    }
    
    echo '</div>';
}

/**
 * Initialize the Pro plugin.
 */
function gslider_pro_init() {
    // Check requirements
    $errors = gslider_pro_check_requirements();
    
    if (!empty($errors)) {
        add_action('admin_notices', 'gslider_pro_admin_notice');
        return;
    }
    
    // Load Composer autoloader
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require_once __DIR__ . '/vendor/autoload.php';
    }
    
    // Tell free plugin that Pro is active
    define('GSLIDER_PRO_ACTIVE', true);
    
    // Initialize Pro plugin classes
    require_once GSLIDER_PRO_DIR_PATH . 'includes/Plugin.php';
}

// Hook into free plugin's loaded action
add_action('gslider_loaded', 'gslider_pro_init', 20);

// If free plugin doesn't fire gslider_loaded, still show the notice
add_action('admin_init', function() {
    if (!defined('GSLIDER_PRO_ACTIVE')) {
        add_action('admin_notices', 'gslider_pro_admin_notice');
    }
});
```

---

## `includes/Plugin.php`

```php
<?php
/**
 * GSlider Blocks Pro Plugin
 *
 * @package GSliderBlocksPro
 */

namespace GSliderPro;

use GSliderPro\Classes\ProBlockRegistration;
use GSliderPro\Classes\ProBlockExtensions;
use GSliderPro\Classes\ProAssets;
use GSliderPro\Classes\AdminMenu;
use GSliderPro\License\LicenseManager;
use GSliderPro\License\LicenseAdmin;
use GSliderPro\License\Updater;

if (!defined('ABSPATH')) {
    exit;
}

class Plugin {
    
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function __construct() {
        // Initialize license system first
        $this->init_license();
        
        // Only load pro features if license is valid
        $license = new LicenseManager();
        if ($license->is_valid()) {
            $this->init_pro_features();
        }
        
        // Fire action for other plugins
        do_action('gslider_pro_loaded');
    }
    
    /**
     * Initialize license management.
     */
    private function init_license() {
        $license_admin = new LicenseAdmin();
        $license_admin->register();
        
        $updater = new Updater();
        $updater->register();
        
        // Periodic license validation
        $manager = new LicenseManager();
        $manager->validate_periodically();
    }
    
    /**
     * Initialize pro features (only when licensed).
     */
    private function init_pro_features() {
        // Register pro-only blocks
        add_filter('gslider_registered_blocks', [$this, 'add_pro_blocks']);
        
        // Extend free blocks with pro features
        ProBlockExtensions::getInstance()->register();
        
        // Enqueue pro assets
        add_action('gslider_admin_assets_enqueued', [$this, 'enqueue_pro_editor']);
        add_action('gslider_frontend_assets_enqueued', [$this, 'enqueue_pro_frontend']);
        
        do_action('gslider_pro_features_loaded');
    }
    
    /**
     * Add pro blocks to the registered blocks list.
     */
    public function add_pro_blocks($blocks) {
        $pro_blocks = [
            'before-after-slider',
            'video-slider',
            'post-carousel',
            // Add more pro blocks as you build them
        ];
        
        return array_merge($blocks, $pro_blocks);
    }
    
    /**
     * Enqueue pro editor scripts and styles.
     */
    public function enqueue_pro_editor() {
        $asset_file = include GSLIDER_PRO_DIR_PATH . 'build/pro-editor.asset.php';
        
        wp_enqueue_script(
            'gslider-blocks-pro-editor',
            GSLIDER_PRO_PLUGIN_URL . 'build/pro-editor.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        
        wp_enqueue_style(
            'gslider-blocks-pro-editor',
            GSLIDER_PRO_PLUGIN_URL . 'build/pro-editor.css',
            [],
            GSLIDER_PRO_VERSION
        );
        
        // Pass pro data to JS
        wp_localize_script('gslider-blocks-pro-editor', 'gsliderProData', [
            'isActive'  => true,
            'version'   => GSLIDER_PRO_VERSION,
            'features'  => $this->get_available_features(),
            'pluginUrl' => GSLIDER_PRO_PLUGIN_URL,
        ]);
    }
    
    /**
     * Enqueue pro frontend scripts and styles.
     */
    public function enqueue_pro_frontend() {
        // Only load if pro blocks are used on the page
        // (implement smart loading similar to free plugin)
    }
    
    /**
     * Get list of available pro features.
     */
    private function get_available_features() {
        return apply_filters('gslider_pro_available_features', [
            'parallax'           => true,
            'advanced_animation' => true,
            'custom_css'         => true,
            'dynamic_content'    => true,
            'conditional'        => true,
        ]);
    }
}

Plugin::getInstance();
```

---

## `includes/Classes/ProBlockExtensions.php`

```php
<?php
/**
 * Extend free blocks with pro features.
 *
 * @package GSliderBlocksPro
 */

namespace GSliderPro\Classes;

class ProBlockExtensions {
    
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Register all pro extensions for free blocks.
     */
    public function register() {
        // Extend Base Slider
        add_filter('gslider_render_block_base', [$this, 'extend_base_slider'], 10, 4);
        
        // Extend Image Slider
        add_filter('gslider_render_block_image-slider', [$this, 'extend_image_slider'], 10, 4);
        
        // Extend Logo Carousel
        add_filter('gslider_render_block_logo-carousel', [$this, 'extend_logo_carousel'], 10, 4);
        
        // Extend Testimonial
        add_filter('gslider_render_block_testimonial', [$this, 'extend_testimonial'], 10, 4);
        
        // Add pro styles
        add_filter('gslider_block_styles', [$this, 'add_pro_styles'], 10, 3);
    }
    
    /**
     * Extend Base Slider block rendering.
     */
    public function extend_base_slider($output, $attributes, $content, $block_name) {
        // Add parallax data attributes
        if (!empty($attributes['enableParallax'])) {
            $output = str_replace(
                'class="gslider-base-slider',
                'data-parallax="true" data-parallax-intensity="' . 
                    esc_attr($attributes['parallaxIntensity'] ?? 50) . 
                    '" class="gslider-base-slider',
                $output
            );
        }
        
        // Add custom CSS
        if (!empty($attributes['customCSS'])) {
            $output .= '<style>' . wp_strip_all_tags($attributes['customCSS']) . '</style>';
        }
        
        return $output;
    }
    
    // ... similar methods for other blocks ...
    
    /**
     * Add pro styles to generated block CSS.
     */
    public function add_pro_styles($styles, $block_name, $attributes) {
        // Add pro-specific CSS rules based on attributes
        return $styles;
    }
}
```

---

## `composer.json`

```json
{
    "name": "noruzzamans/gslider-blocks-pro",
    "description": "Pro addon for GSlider Blocks",
    "type": "wordpress-plugin",
    "license": "GPL-2.0-or-later",
    "autoload": {
        "psr-4": {
            "GSliderPro\\": "includes/"
        }
    },
    "require": {
        "php": ">=7.4",
        "appsero/client": "^2.0"
    }
}
```

## `package.json`

```json
{
    "name": "gslider-blocks-pro",
    "version": "1.0.0",
    "description": "Pro addon for GSlider Blocks",
    "scripts": {
        "build": "wp-scripts build",
        "start": "wp-scripts start",
        "lint:js": "wp-scripts lint-js"
    },
    "devDependencies": {
        "@wordpress/scripts": "^29.0.0"
    },
    "dependencies": {
        "react-select": "^5.8.0"
    }
}
```

> [!NOTE]
> `react-select` is included because the free plugin's `ResponsiveTypographyControl` uses it for the font family selector.

---

## `webpack.config.js` ⭐ CRITICAL

This is the **most important file** — it enables pro blocks to import free plugin's custom components at build time.

```javascript
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Path to free plugin source — ADJUST this based on your directory layout
// During local development: both plugins sit side-by-side in wp-content/plugins/
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
            // ═══════════════════════════════════════════════════
            // Build-time aliases to FREE plugin's source code.
            // Webpack resolves these at compile time and bundles
            // the components into Pro's own dist/blocks.js.
            // This is the SAME approach Spectra Pro uses.
            // ═══════════════════════════════════════════════════
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

### Why This Works

1. **Build time:** When you run `npm run build`, webpack reads `@Components/color-control` → resolves to `../gslider-blocks/src/components/color-control/index.js` → bundles that code into `build/blocks.js`
2. **Runtime:** Pro plugin's `build/blocks.js` is self-contained. No cross-plugin JS dependency needed
3. **Same API:** Pro blocks use the exact same import syntax as free blocks

---

## Updated `includes/Classes/ProAssets.php`

```php
<?php
namespace GSliderPro\Classes;

if (!defined('ABSPATH')) {
    exit;
}

class ProAssets {

    use \GSliderPro\Traits\SingletonTrait;

    public function register() {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_action('enqueue_block_assets', [$this, 'enqueue_block_assets']);
    }

    /**
     * Enqueue pro editor scripts.
     * The free plugin's editor script is declared as a dependency
     * to ensure it loads first (Spectra-style).
     */
    public function enqueue_editor_assets() {
        $asset_path = GSLIDER_PRO_DIR_PATH . 'build/blocks.asset.php';
        $asset_file = file_exists($asset_path)
            ? include $asset_path
            : ['dependencies' => [], 'version' => GSLIDER_PRO_VERSION];

        // Add free plugin editor script as dependency
        $dependencies = array_merge(
            $asset_file['dependencies'],
            ['gslider-blocks-editor-js']  // ← Free plugin's editor handle
        );

        wp_enqueue_script(
            'gslider-blocks-pro-editor',
            GSLIDER_PRO_PLUGIN_URL . 'build/blocks.js',
            $dependencies,
            $asset_file['version'],
            true
        );

        wp_enqueue_style(
            'gslider-blocks-pro-editor-css',
            GSLIDER_PRO_PLUGIN_URL . 'build/blocks.css',
            [],
            GSLIDER_PRO_VERSION
        );

        // Pass pro data to JS
        wp_localize_script('gslider-blocks-pro-editor', 'gsliderProData', [
            'isActive'  => true,
            'version'   => GSLIDER_PRO_VERSION,
            'pluginUrl' => GSLIDER_PRO_PLUGIN_URL,
        ]);
    }

    /**
     * Enqueue pro frontend styles.
     */
    public function enqueue_block_assets() {
        if (file_exists(GSLIDER_PRO_DIR_PATH . 'build/style-blocks.css')) {
            wp_enqueue_style(
                'gslider-blocks-pro-frontend',
                GSLIDER_PRO_PLUGIN_URL . 'build/style-blocks.css',
                [],
                GSLIDER_PRO_VERSION
            );
        }
    }
}
```

---

> [!TIP]
> This boilerplate gives you a **working skeleton** with Spectra-style component sharing. When you're ready to start development:
> 1. Copy the boilerplate files to `wp-content/plugins/gslider-blocks-pro/`
> 2. Run `composer install` → `npm install` → `npm run build`
> 3. Activate the pro plugin in WordPress
> 4. Start building pro blocks using the same `@Components` imports as free blocks!
