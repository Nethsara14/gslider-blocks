/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { SlotFillProvider, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createReduxStore, register, select } from '@wordpress/data';

import InspectorControl from '@Components/inspector-controls';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import PresetSelector from '@Components/preset-selector';
import ContentOrderControl from '@Components/content-order-control';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import ColorControl from '@Components/color-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import InputControls from '@Components/input-control';
import UrlControl from '@Components/url-control';
import { HORIZONTAL_POSITION_ICONS } from '@Constants';

// Register core/editor store mock in Storybook so ColorControl does not error
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
							{ name: 'Dark', slug: 'dark', color: '#1e293b' },
							{ name: 'Light', slug: 'light', color: '#f8fafc' },
						],
					} ),
				},
			} );
			register( editorStore );
		}
	} catch ( _ ) {}
}

// Ensure Google Fonts mock fallback is available for typography control
if ( typeof window !== 'undefined' && ! window.__gslider_fetch_mocked ) {
	window.__gslider_fetch_mocked = true;
	const originalFetch = window.fetch.bind( window );
	window.fetch = async ( ...args ) => {
		const url =
			typeof args[ 0 ] === 'string'
				? args[ 0 ]
				: args[ 0 ]?.url || String( args[ 0 ] );
		if ( url.includes( 'google-fonts.json' ) ) {
			try {
				const response = await originalFetch( ...args );
				if ( response.ok ) {
					return response;
				}
			} catch ( _ ) {}
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
		return originalFetch( ...args );
	};
}

export default {
	title: 'GSlider Compositions/FullInspectorPanel',
	component: InspectorControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'FullInspectorPanel demonstrates the authentic WordPress Gutenberg Block Inspector Sidebar composition in GSlider Blocks. It integrates `InspectorControl` with General, Style, and Advanced tabs, housing 12+ production controls (SwitcherControl, ResponsiveAlignmentControl, PresetSelector, ContentOrderControl, ResponsiveToggleControl, ResponsiveSpacingControl, ResponsiveTypographyControl, ColorControl, BoxShadowSettingsControl, InputControls, and UrlControl).',
			},
		},
	},
};

const SAMPLE_PRESETS = [
	{
		value: 'preset-classic',
		label: 'Classic',
		icon: 'align-center',
		description: 'Centered layout with neutral tones',
		isDefault: true,
	},
	{
		value: 'preset-modern',
		label: 'Modern',
		icon: 'align-left',
		description: 'Left-aligned clean design',
	},
	{
		value: 'preset-minimal',
		label: 'Minimal',
		icon: 'editor-kitchensink',
		description: 'Compact layout with slim padding',
	},
	{
		value: 'preset-bold',
		label: 'Bold Hero',
		icon: 'star-filled',
		description: 'Generous padding and high contrast',
	},
];

const SLIDE_CONTENT_ITEMS = [
	{ key: 'title', label: 'Slide Title', icon: 'editor-textcolor' },
	{ key: 'subtitle', label: 'Subtitle', icon: 'text' },
	{ key: 'description', label: 'Description', icon: 'editor-paragraph' },
	{ key: 'buttons', label: 'Action Buttons', icon: 'button' },
];

const ALIGN_OPTIONS = [
	{ label: HORIZONTAL_POSITION_ICONS.left, value: 'left' },
	{ label: HORIZONTAL_POSITION_ICONS.center, value: 'center' },
	{ label: HORIZONTAL_POSITION_ICONS.right, value: 'right' },
];

function FullInspectorSandbox() {
	// Active device for responsive controls
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );

	// General tab state
	const [ heightSwitcher, setHeightSwitcher ] = useState( 'auto' );
	const [ alignment, setAlignment ] = useState( {
		Desktop: 'center',
		Tablet: 'center',
		Mobile: 'center',
	} );
	const [ presetStyle, setPresetStyle ] = useState( 'preset-classic' );
	const [ navigationToggle, setNavigationToggle ] = useState( {
		Desktop: true,
		Tablet: true,
		Mobile: true,
	} );
	const [ paginationToggle, setPaginationToggle ] = useState( {
		Desktop: true,
		Tablet: true,
		Mobile: false,
	} );
	const [ autoplayToggle, setAutoplayToggle ] = useState( {
		Desktop: false,
		Tablet: false,
		Mobile: false,
	} );
	const [ contentOrder, setContentOrder ] = useState( [
		'title',
		'subtitle',
		'description',
		'buttons',
	] );

	// Style tab state
	const [ paddingDesktop, setPaddingDesktop ] = useState( {
		top: '30',
		right: '30',
		bottom: '30',
		left: '30',
	} );
	const [ paddingTablet, setPaddingTablet ] = useState( {
		top: '20',
		right: '20',
		bottom: '20',
		left: '20',
	} );
	const [ paddingMobile, setPaddingMobile ] = useState( {
		top: '15',
		right: '15',
		bottom: '15',
		left: '15',
	} );
	const [ paddingLink, setPaddingLink ] = useState( true );
	const [ paddingUnits, setPaddingUnits ] = useState( {
		Desktop: 'px',
		Tablet: 'px',
		Mobile: 'px',
	} );

	const [ fontFamily, setFontFamily ] = useState( 'Default' );
	const [ fontSize, setFontSize ] = useState( {
		Desktop: '32',
		Tablet: '26',
		Mobile: '20',
	} );
	const [ fontWeight, setFontWeight ] = useState( '700' );

	const [ textColor, setTextColor ] = useState( '#1e293b' );
	const [ bgColor, setBgColor ] = useState( '#ffffff' );
	const [ boxShadow, setBoxShadow ] = useState( [
		0,
		4,
		12,
		0,
		'',
		'rgba(0,0,0,0.08)',
	] );

	// Advanced tab state
	const [ zIndex, setZIndex ] = useState( '1' );
	const [ customClass, setCustomClass ] = useState( 'my-custom-slider' );
	const [ htmlAnchor, setHtmlAnchor ] = useState( 'hero-slider' );
	const [ slideUrl, setSlideUrl ] = useState( 'https://example.com' );
	const [ urlOpenInNewTab, setUrlOpenInNewTab ] = useState( false );
	const [ urlNofollow, setUrlNofollow ] = useState( false );
	const [ urlSponsored, setUrlSponsored ] = useState( false );

	const generalControls = (
		<>
			<PanelBody title="Slider Layout" initialOpen={ true }>
				<SwitcherControl
					label="Layout Height"
					value={ heightSwitcher }
					options={ [
						{ label: 'Auto', value: 'auto' },
						{ label: 'Fixed', value: 'fixed' },
					] }
					onChange={ setHeightSwitcher }
					help="Choose adaptive auto-height or a fixed viewport height."
				/>
				<ResponsiveAlignmentControl
					label="Content Alignment"
					deviceType={ deviceType }
					alignmentValue={ alignment }
					setAlignmentValue={ setAlignment }
					options={ ALIGN_OPTIONS }
				/>
				<PresetSelector
					label="Layout Preset"
					value={ presetStyle }
					presets={ SAMPLE_PRESETS }
					onChange={ setPresetStyle }
				/>
			</PanelBody>

			<PanelBody title="Navigation & Controls" initialOpen={ false }>
				<ResponsiveToggleControl
					label="Navigation Arrows"
					deviceType={ deviceType }
					toggleValue={ navigationToggle }
					setToggleValue={ setNavigationToggle }
				/>
				<ResponsiveToggleControl
					label="Pagination Dots"
					deviceType={ deviceType }
					toggleValue={ paginationToggle }
					setToggleValue={ setPaginationToggle }
				/>
				<ResponsiveToggleControl
					label="Autoplay"
					deviceType={ deviceType }
					toggleValue={ autoplayToggle }
					setToggleValue={ setAutoplayToggle }
				/>
			</PanelBody>

			<PanelBody title="Slide Content Order" initialOpen={ false }>
				<ContentOrderControl
					label="Content Hierarchy"
					items={ SLIDE_CONTENT_ITEMS }
					order={ contentOrder }
					onChange={ setContentOrder }
					help="Drag items to rearrange the stacking hierarchy."
				/>
			</PanelBody>
		</>
	);

	const styleControls = (
		<>
			<PanelBody title="Spacing & Dimensions" initialOpen={ true }>
				<ResponsiveSpacingControl
					label="Container Padding"
					deviceType={ deviceType }
					isLinked={ paddingLink }
					units={ paddingUnits }
					desktopSpacing={ paddingDesktop }
					tabletSpacing={ paddingTablet }
					mobileSpacing={ paddingMobile }
					onDeviceChange={ setDeviceType }
					onLinkChange={ setPaddingLink }
					onUnitChange={ setPaddingUnits }
					onDesktopChange={ setPaddingDesktop }
					onTabletChange={ setPaddingTablet }
					onMobileChange={ setPaddingMobile }
				/>
			</PanelBody>

			<PanelBody title="Title Typography" initialOpen={ false }>
				<ResponsiveTypographyControl
					label="Title Typography"
					deviceType={ deviceType }
					fontFamily={ fontFamily }
					fontSize={ fontSize }
					fontWeight={ fontWeight }
					onDeviceChange={ setDeviceType }
					onFontFamilyChange={ setFontFamily }
					onFontSizeChange={ setFontSize }
					onFontWeightChange={ setFontWeight }
				/>
			</PanelBody>

			<PanelBody title="Colors & Background" initialOpen={ false }>
				<ColorControl
					label="Text Color"
					color={ textColor }
					onChangeColor={ setTextColor }
				/>
				<ColorControl
					label="Background Color"
					color={ bgColor }
					onChangeColor={ setBgColor }
				/>
			</PanelBody>

			<PanelBody title="Box Shadow" initialOpen={ false }>
				<BoxShadowSettingsControl
					label="Slide Shadow"
					initialShadowValue={ boxShadow }
					onBoxShadowChange={ setBoxShadow }
				/>
			</PanelBody>
		</>
	);

	const advancedControls = (
		<>
			<PanelBody title="Layout & Positioning" initialOpen={ true }>
				<InputControls
					label="Z-Index"
					value={ zIndex }
					onChangeValue={ setZIndex }
					helpText="Stacking order of the slider container."
				/>
				<InputControls
					label="Additional CSS Class(es)"
					value={ customClass }
					onChangeValue={ setCustomClass }
					helpText="Separate multiple classes with spaces."
				/>
				<InputControls
					label="HTML Anchor"
					value={ htmlAnchor }
					onChangeValue={ setHtmlAnchor }
					helpText="Enter a word or two without spaces to create a unique web address for this block."
				/>
			</PanelBody>

			<PanelBody title="Slide Action URL" initialOpen={ false }>
				<UrlControl
					label="Destination Link"
					url={ slideUrl }
					openInNewTab={ urlOpenInNewTab }
					nofollow={ urlNofollow }
					sponsored={ urlSponsored }
					onChangeUrl={ setSlideUrl }
					onChangeOpenInNewTab={ setUrlOpenInNewTab }
					onChangeNofollow={ setUrlNofollow }
					onChangeSponsored={ setUrlSponsored }
				/>
			</PanelBody>
		</>
	);

	return (
		<SlotFillProvider>
			<InspectorControl
				generalControls={ generalControls }
				styleControls={ styleControls }
				advancedControls={ advancedControls }
			/>
			<InspectorControls.Slot />
		</SlotFillProvider>
	);
}

export const Default = {
	render: function Render() {
		return <FullInspectorSandbox />;
	},
};
