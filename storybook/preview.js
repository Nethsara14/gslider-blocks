// 1. Initialize WordPress Global Mocks once for all stories
import './mocks/wp';

import theme from './theme';
import { WithGlobalCSS } from './decorators/with-global-css';
import { WithRTL } from './decorators/with-rtl';
import { WithMaxWidthWrapper } from './decorators/with-max-width-wrapper';

/**
 * Gutenberg-aligned Storybook toolbar globals.
 */
export const globalTypes = {
	direction: {
		name: 'RTL',
		description: 'Simulate an RTL language layout.',
		defaultValue: 'ltr',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'ltr', title: 'LTR' },
				{ value: 'rtl', title: 'RTL' },
			],
		},
	},
	css: {
		name: 'Global CSS',
		description:
			'Inject global CSS stylesheets loaded in Gutenberg contexts.',
		defaultValue: 'wordpress',
		toolbar: {
			icon: 'document',
			items: [
				{ value: 'none', title: 'None' },
				{ value: 'basic', title: 'Font only' },
				{
					value: 'wordpress',
					title: 'WordPress (core components & block controls)',
				},
			],
		},
	},
	maxWidthWrapper: {
		name: 'Max-Width Wrapper',
		description: 'Wrap the component in a responsive container or sidebar.',
		defaultValue: 'wordpress-sidebar',
		toolbar: {
			icon: 'outline',
			items: [
				{ value: 'none', title: 'None (100% Full Width)' },
				{
					value: 'wordpress-sidebar',
					title: 'WP Sidebar (Inspector 300px)',
				},
				{ value: 'small-container', title: 'Small Container (600px)' },
				{ value: 'large-container', title: 'Large Container (960px)' },
			],
		},
	},
};

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		options: {
			storySort: {
				order: [
					'Introduction',
					'Design Principles',
					'Components',
					'Compositions',
				],
			},
		},
		a11y: {
			test: 'error',
		},
		controls: {
			expanded: true,
			sort: 'requiredFirst',
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			theme,
			controls: {
				sort: 'requiredFirst',
			},
		},
	},
	decorators: [ WithGlobalCSS, WithRTL, WithMaxWidthWrapper ],
};

export default preview;
