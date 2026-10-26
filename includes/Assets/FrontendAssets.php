<?php
/**
 * Frontend asset management for GSlider Blocks.
 *
 * Handles registration and enqueueing of frontend-specific
 * styles and scripts including Swiper and fsLightbox.
 *
 * @package GSlider\Assets
 * @since   1.0.0
 */

namespace GSlider\Assets;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Manages frontend asset loading.
 *
 * Registers Swiper CSS/JS and fsLightbox JS for use
 * by individual blocks on the frontend.
 *
 * @since 1.0.0
 */
class FrontendAssets implements Registrable {
    use SingletonTrait;

    /**
     * Registers frontend asset hooks.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register(): void {
        add_action( 'enqueue_block_assets', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Registers and enqueues frontend styles and scripts.
     *
     * Registers Swiper CSS and JS bundles, and the fsLightbox
     * script. Enqueues fsLightbox in the admin editor only.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_assets() {
        wp_register_style(
            'gslider-blocks-swiper-style',
            GSLIDER_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
            [],
            GSLIDER_VERSION
        );

        wp_register_script(
            'gslider-blocks-swiper-script',
            GSLIDER_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
            [],
            GSLIDER_VERSION,
            [
                'in_footer' => true,
                'strategy'  => 'defer',
            ]
        );

        wp_register_script(
            'gslider-blocks-fslightbox-script',
            GSLIDER_PLUGIN_URL . 'assets/js/fslightbox.min.js',
            [],
            GSLIDER_VERSION,
            [
                'in_footer' => true,
                'strategy'  => 'defer',
            ]
        );

        // Register block viewScript handles with 'defer' strategy and Swiper dependency.
        // WordPress 6.3+ drops 'defer' from a dependency (like swiper-script) if any dependent script is blocking.
        $block_slugs = [
            'base',
            'flexi-content',
            'image-slider',
            'logo-carousel',
            'testimonial',
        ];

        foreach ( $block_slugs as $slug ) {
            $handle        = "gslider-blocks-{$slug}-view-script";
            $legacy_handle = "gslider-{$slug}-view-script";

            $asset_file = ( defined( 'GSLIDER_DIR_PATH' ) ? trailingslashit( GSLIDER_DIR_PATH ) : dirname( __DIR__, 2 ) . '/' ) . "build/blocks/{$slug}/view.asset.php";
            $asset_deps = [ 'gslider-blocks-swiper-script' ];
            $asset_ver  = GSLIDER_VERSION;

            if ( file_exists( $asset_file ) ) {
                $asset = require $asset_file;
                if ( ! empty( $asset['dependencies'] ) && is_array( $asset['dependencies'] ) ) {
                    $asset_deps = array_unique( array_merge( $asset['dependencies'], $asset_deps ) );
                }
                if ( ! empty( $asset['version'] ) ) {
                    $asset_ver = $asset['version'];
                }
            }

            foreach ( [ $handle, $legacy_handle ] as $script_handle ) {
                if ( function_exists( 'wp_script_is' ) && wp_script_is( $script_handle, 'registered' ) ) {
                    if ( function_exists( 'wp_script_add_data' ) ) {
                        wp_script_add_data( $script_handle, 'strategy', 'defer' );
                    }
                } else {
                    wp_register_script(
                        $script_handle,
                        GSLIDER_PLUGIN_URL . "build/blocks/{$slug}/view.js",
                        $asset_deps,
                        $asset_ver,
                        [
                            'in_footer' => true,
                            'strategy'  => 'defer',
                        ]
                    );
                }
            }
        }

        // Enqueue fsLightbox for admin editor only.
        if ( is_admin() ) {
            wp_enqueue_script( 'gslider-blocks-fslightbox-script' );
        }
    }
}
