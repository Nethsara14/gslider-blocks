import { createElement } from '@wordpress/element';
import '@wordpress/components/build-style/style.css';
import '../../assets/admin/css/block-controls.css';

/**
 * Decorator that injects WordPress component styles and manages global CSS contexts,
 * matching Gutenberg's with-global-css approach.
 *
 * @param {Function} Story   Story component.
 * @param {Object}   context Storybook context.
 * @return {Element} Rendered element.
 */
export const WithGlobalCSS = ( Story, context ) => {
	const css = context?.globals?.css || 'wordpress';

	let className = 'gslider-storybook-root';
	if ( css === 'wordpress' ) {
		className += ' gslider-storybook-wordpress-root wp-core-ui';
	} else if ( css === 'basic' ) {
		className += ' gslider-storybook-font-only';
	}

	return createElement(
		'div',
		{
			className,
			style: {
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
			},
		},
		createElement( Story )
	);
};
