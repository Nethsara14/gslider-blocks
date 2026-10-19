import { createReduxStore, register, select } from '@wordpress/data';

/**
 * Storybook WordPress Global Mocks.
 *
 * Centralizes all mocks for:
 * 1. core/editor Redux data store (used by ColorControl, BackgroundControl, etc.)
 * 2. wp.media modal mock (used by ImageControl, BackgroundControl, etc.)
 * 3. Google Fonts API fetch fallback (used by ResponsiveTypographyControl)
 * 4. Preseeded SVG icon cache (used by IconPicker)
 */

// 1. Register core/editor Redux store mock
if ( typeof window !== 'undefined' && ! window.__gslider_editor_store_mocked ) {
	window.__gslider_editor_store_mocked = true;
	try {
		if ( ! select( 'core/editor' ) ) {
			const editorStore = createReduxStore( 'core/editor', {
				reducer: ( state = {} ) => state,
				selectors: {
					getEditorSettings: () => ( {
						colors: [
							{
								name: 'Primary',
								slug: 'primary',
								color: '#2563eb',
							},
							{
								name: 'Secondary',
								slug: 'secondary',
								color: '#10b981',
							},
							{
								name: 'Dark',
								slug: 'dark',
								color: '#1e293b',
							},
							{
								name: 'Light',
								slug: 'light',
								color: '#f8fafc',
							},
						],
					} ),
				},
			} );
			register( editorStore );
		}
	} catch ( _ ) {}
}

// 2. Ensure wp.media mock is available in Storybook for media uploads
if ( typeof window !== 'undefined' && ! window.wp?.media ) {
	window.wp = window.wp || {};
	window.wp.media = () => {
		let selectCallback = null;
		const instance = {
			state: () => ( {
				get: () => ( {
					first: () => ( {
						toJSON: () => ( {
							id: 101,
							url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
							alt: 'Sample Slider Image',
						} ),
					} ),
				} ),
			} ),
			on: ( event, cb ) => {
				if ( event === 'select' ) {
					selectCallback = cb;
				}
			},
			open: () => {
				if ( selectCallback ) {
					selectCallback();
				}
			},
		};
		return instance;
	};
}

// 3. Ensure Google Fonts mock fallback is available for typography control
if ( typeof window !== 'undefined' && ! window.__gslider_fetch_mocked ) {
	window.__gslider_fetch_mocked = true;
	const originalFetch = window.fetch ? window.fetch.bind( window ) : null;
	window.fetch = async ( ...args ) => {
		const url =
			typeof args[ 0 ] === 'string'
				? args[ 0 ]
				: args[ 0 ]?.url || String( args[ 0 ] );
		if ( url.includes( 'google-fonts.json' ) ) {
			if ( originalFetch ) {
				try {
					const response = await originalFetch( ...args );
					if ( response.ok ) {
						return response;
					}
				} catch ( _ ) {}
			}
			return new Response(
				JSON.stringify( {
					Default: [ 'inherit' ],
					Roboto: [ '400', '700' ],
					'Open Sans': [ '400', '600', '700' ],
					Inter: [ '400', '500', '600', '700' ],
				} ),
				{ headers: { 'Content-Type': 'application/json' } }
			);
		}
		if ( originalFetch ) {
			return originalFetch( ...args );
		}
		return new Response( '{}', { status: 200 } );
	};
}

// 4. Pre-seed fallback icons for IconPicker in Storybook
if ( typeof window !== 'undefined' && ! window.__gslider_icons_preseeded ) {
	window.__gslider_icons_preseeded = true;
	try {
		const icons = {
			'angle-left': {
				svg: {
					solid: {
						width: 384,
						height: 512,
						path: 'M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z',
					},
				},
				label: 'angle-left',
			},
			'angle-right': {
				svg: {
					solid: {
						width: 384,
						height: 512,
						path: 'M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z',
					},
				},
				label: 'angle-right',
			},
			'arrow-left': {
				svg: {
					solid: {
						width: 448,
						height: 512,
						path: 'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z',
					},
				},
				label: 'arrow-left',
			},
			'arrow-right': {
				svg: {
					solid: {
						width: 448,
						height: 512,
						path: 'M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.8 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z',
					},
				},
				label: 'arrow-right',
			},
		};
		window.localStorage.setItem(
			'gslider_svg_icons',
			JSON.stringify( icons )
		);
	} catch ( _ ) {}
}
