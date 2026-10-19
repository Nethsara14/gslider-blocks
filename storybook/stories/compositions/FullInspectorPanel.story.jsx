/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { useArgs } from '@storybook/preview-api';
import { expect, within } from '@storybook/test';
import { SlotFillProvider, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

// All 22 GSlider Core Inspector Components
import InspectorControl from '@Components/inspector-controls';
import SwitcherControl from '@Components/switcher-control';
import HtmlTagControl from '@Components/html-tag-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import PresetSelector from '@Components/preset-selector';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import IconPicker from '@Components/icon-picker';
import ContentOrderControl from '@Components/content-order-control';
import ImageControl from '@Components/image-control';

import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import ColorControl from '@Components/color-control';
import GradientColorControl from '@Components/gradient-color-control';
import BackgroundControl from '@Components/background-control';
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';

import InputControls from '@Components/input-control';
import UrlControl from '@Components/url-control';
import { HORIZONTAL_POSITION_ICONS, HTML_TAGS } from '@Constants';

export default {
	title: 'Compositions/FullInspectorPanel',
	component: InspectorControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'FullInspectorPanel is the benchmark composition showcase for GSlider Blocks. It integrates all 22 custom controls into an authentic WordPress Gutenberg Block Inspector Sidebar with General, Style, and Advanced tabs.',
			},
		},
	},
	argTypes: {
		presetStyle: {
			name: 'Preset Style',
			control: 'select',
			options: [
				'preset-classic',
				'preset-modern',
				'preset-minimal',
				'preset-bold',
			],
			description: 'Active layout preset selection',
		},
		titleTag: {
			name: 'Title Tag',
			control: 'select',
			options: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span' ],
			description: 'Slide title HTML heading tag',
		},
		textColor: {
			name: 'Text Color',
			control: 'color',
			description: 'Primary title text color',
		},
		deviceType: {
			name: 'Device View',
			control: 'select',
			options: [ 'Desktop', 'Tablet', 'Mobile' ],
			description: 'Active responsive device breakpoint',
		},
		zIndex: {
			name: 'Z-Index',
			control: 'text',
			description: 'Container stacking order',
		},
		customClass: {
			name: 'Custom Class',
			control: 'text',
			description: 'Additional CSS class names',
		},
		htmlAnchor: {
			name: 'HTML Anchor',
			control: 'text',
			description: 'Unique anchor link ID',
		},
		generalControls: {
			table: { disable: true },
		},
		styleControls: {
			table: { disable: true },
		},
		advancedControls: {
			table: { disable: true },
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

function FullInspectorSandbox( props ) {
	const [ , updateArgs ] = useArgs();

	// Synced args
	const deviceType = props.deviceType || 'Desktop';
	const setDeviceType = ( val ) => updateArgs( { deviceType: val } );

	const titleTag = props.titleTag || 'h2';
	const setTitleTag = ( val ) => updateArgs( { titleTag: val } );

	const presetStyle = props.presetStyle || 'preset-classic';
	const setPresetStyle = ( val ) => updateArgs( { presetStyle: val } );

	const textColor = props.textColor || '#1e293b';
	const setTextColor = ( val ) => updateArgs( { textColor: val } );

	const zIndex = props.zIndex || '1';
	const setZIndex = ( val ) => updateArgs( { zIndex: val } );

	const customClass = props.customClass || '';
	const setCustomClass = ( val ) => updateArgs( { customClass: val } );

	const htmlAnchor = props.htmlAnchor || '';
	const setHtmlAnchor = ( val ) => updateArgs( { htmlAnchor: val } );

	// ── General Tab State ─────────────────────────────────
	const [ heightSwitcher, setHeightSwitcher ] = useState( 'auto' );
	const [ alignment, setAlignment ] = useState( {
		Desktop: 'center',
		Tablet: 'center',
		Mobile: 'center',
	} );

	const [ navigationToggle, setNavigationToggle ] = useState( {
		Desktop: true,
		Tablet: true,
		Mobile: true,
	} );
	const [ arrowIcon, setArrowIcon ] = useState( 'angle-right' );
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

	const [ slideImageUrl, setSlideImageUrl ] = useState(
		'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop'
	);
	const [ slideImageAlt, setSlideImageAlt ] = useState( 'Slide Beach Image' );
	const [ slideImageId, setSlideImageId ] = useState( 101 );
	const [ slideImageSize, setSlideImageSize ] = useState( 'full' );

	// ── Style Tab State ───────────────────────────────────
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

	const [ fontFamily, setFontFamily ] = useState( 'Inter' );
	const [ fontSize, setFontSize ] = useState( {
		Desktop: 32,
		Tablet: 26,
		Mobile: 20,
	} );
	const [ fontWeight, setFontWeight ] = useState( '700' );

	const [ customGradientSwitcher, setCustomGradientSwitcher ] =
		useState( 'gradient' );
	const [ customGradientValue, setCustomGradientValue ] = useState(
		'linear-gradient(135deg, #2563eb 0%, #10b981 100%)'
	);
	const [ gradientColor, setGradientColor ] = useState(
		'linear-gradient(135deg, #2563eb 0%, #10b981 100%)'
	);

	const [ normalBgType, setNormalBgType ] = useState( 'classic' );
	const [ normalBgColor, setNormalBgColor ] = useState( '#f8fafc' );

	const [ bgImageUrl, setBgImageUrl ] = useState(
		'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop'
	);
	const [ bgImageAlt, setBgImageAlt ] = useState( 'Night Mountains' );
	const [ bgImageId, setBgImageId ] = useState( 102 );
	const [ bgPosition, setBgPosition ] = useState( {
		Desktop: 'center center',
	} );
	const [ bgAttachment, setBgAttachment ] = useState( { Desktop: 'scroll' } );
	const [ bgRepeat, setBgRepeat ] = useState( { Desktop: 'no-repeat' } );
	const [ bgSize, setBgSize ] = useState( { Desktop: 'cover' } );

	const [ boxShadow, setBoxShadow ] = useState(
		'0px 10px 25px rgba(0, 0, 0, 0.08)'
	);

	// ── Advanced Tab State ────────────────────────────────
	const [ slideUrl, setSlideUrl ] = useState( 'https://gslider.io' );
	const [ urlOpenInNewTab, setUrlOpenInNewTab ] = useState( true );
	const [ urlNofollow, setUrlNofollow ] = useState( false );
	const [ urlSponsored, setUrlSponsored ] = useState( false );

	// ── General Controls Assembly ─────────────────────────
	const generalControls = (
		<>
			<PanelBody title="Layout & Presets" initialOpen={ true }>
				<PresetSelector
					label="Slider Layout Preset"
					options={ SAMPLE_PRESETS }
					value={ presetStyle }
					onChange={ setPresetStyle }
				/>
				<SwitcherControl
					label="Height Mode"
					value={ heightSwitcher }
					onChange={ setHeightSwitcher }
					options={ [
						{ label: 'Auto', value: 'auto' },
						{ label: 'Custom', value: 'custom' },
					] }
				/>
				<HtmlTagControl
					label="Slide Title HTML Tag"
					tag={ titleTag }
					options={ HTML_TAGS }
					onChangeTag={ setTitleTag }
				/>
				<ResponsiveAlignmentControl
					label="Content Alignment"
					deviceType={ deviceType }
					alignment={ alignment }
					options={ ALIGN_OPTIONS }
					onDeviceChange={ setDeviceType }
					onAlignmentChange={ setAlignment }
				/>
			</PanelBody>

			<PanelBody title="Navigation & Autoplay" initialOpen={ false }>
				<ResponsiveToggleControl
					label="Arrow Navigation"
					deviceType={ deviceType }
					toggle={ navigationToggle }
					onDeviceChange={ setDeviceType }
					onToggleChange={ setNavigationToggle }
				/>
				<IconPicker
					label="Navigation Arrow Icon"
					value={ arrowIcon }
					onChange={ setArrowIcon }
				/>
				<ResponsiveToggleControl
					label="Pagination Dots"
					deviceType={ deviceType }
					toggle={ paginationToggle }
					onDeviceChange={ setDeviceType }
					onToggleChange={ setPaginationToggle }
				/>
				<ResponsiveToggleControl
					label="Autoplay Slides"
					deviceType={ deviceType }
					toggle={ autoplayToggle }
					onDeviceChange={ setDeviceType }
					onToggleChange={ setAutoplayToggle }
				/>
			</PanelBody>

			<PanelBody title="Slide Content & Media" initialOpen={ false }>
				<ContentOrderControl
					label="Slide Content Order"
					items={ SLIDE_CONTENT_ITEMS }
					value={ contentOrder }
					onChange={ setContentOrder }
				/>
				<ImageControl
					label="Active Slide Image"
					url={ slideImageUrl }
					alt={ slideImageAlt }
					id={ slideImageId }
					size={ slideImageSize }
					onChangeImage={ ( media ) => {
						setSlideImageUrl( media.url );
						setSlideImageAlt( media.alt || 'Slide image' );
						setSlideImageId( media.id );
					} }
					onRemoveImage={ () => {
						setSlideImageUrl( '' );
						setSlideImageAlt( '' );
						setSlideImageId( 0 );
					} }
					onChangeSize={ setSlideImageSize }
				/>
			</PanelBody>
		</>
	);

	// ── Style Controls Assembly ───────────────────────────
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

			<PanelBody title="Colors & Gradients" initialOpen={ false }>
				<ColorControl
					label="Text Color"
					color={ textColor }
					onChangeColor={ setTextColor }
				/>
				<GradientColorControl
					label="Slide Gradient Overlay"
					globalCustomGradientSwitcher={ customGradientSwitcher }
					globalCustomGradientInputValue={ customGradientValue }
					globalGradientColor={ gradientColor }
					setGlobalCustomGradientSwitcher={
						setCustomGradientSwitcher
					}
					setGlobalCustomGradientInputValue={ setCustomGradientValue }
					setGlobalGradientColor={ setGradientColor }
				/>
			</PanelBody>

			<PanelBody title="Multi-layer Background" initialOpen={ false }>
				<BackgroundControl
					label="Slide Background"
					deviceType={ deviceType }
					normalBackgroundType={ normalBgType }
					setNormalBackgroundType={ setNormalBgType }
					normalClassicColor={ normalBgColor }
					setNormalClassicColor={ setNormalBgColor }
					isBackgroundImage={ true }
					isHover={ false }
				/>
			</PanelBody>

			<PanelBody
				title="Responsive Background Image"
				initialOpen={ false }
			>
				<ResponsiveBackgroundImageControl
					label="Responsive Backdrop"
					deviceType={ deviceType }
					globalBackgroundImageUrl={ bgImageUrl }
					setGlobalBackgroundImageUrl={ setBgImageUrl }
					globalBackgroundImageAlt={ bgImageAlt }
					setGlobalBackgroundImageAlt={ setBgImageAlt }
					globalBackgroundImageID={ bgImageId }
					setGlobalBackgroundImageID={ setBgImageId }
					globalBackgroundImagePosition={ bgPosition }
					setGlobalBackgroundImagePosition={ setBgPosition }
					globalBackgroundImageAttachment={ bgAttachment }
					setGlobalBackgroundImageAttachment={ setBgAttachment }
					globalBackgroundImageRepeat={ bgRepeat }
					setGlobalBackgroundImageRepeat={ setBgRepeat }
					globalBackgroundImageSize={ bgSize }
					setGlobalBackgroundImageSize={ setBgSize }
					setAttributes={ () => {} }
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

	// ── Advanced Controls Assembly ────────────────────────
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
					helpText="Enter a word or two without spaces to create a unique anchor link."
				/>
			</PanelBody>

			<PanelBody title="Action Link Settings" initialOpen={ false }>
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
	args: {
		presetStyle: 'preset-classic',
		titleTag: 'h2',
		textColor: '#1e293b',
		deviceType: 'Desktop',
		zIndex: '1',
		customClass: '',
		htmlAnchor: '',
	},
	render: function Render( args ) {
		return <FullInspectorSandbox { ...args } />;
	},
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		expect(
			await canvas.findByRole( 'tab', { name: /General/i } )
		).toBeInTheDocument();
		expect(
			await canvas.findByRole( 'tab', { name: /Style/i } )
		).toBeInTheDocument();
		expect(
			await canvas.findByRole( 'tab', { name: /Advanced/i } )
		).toBeInTheDocument();
	},
};
