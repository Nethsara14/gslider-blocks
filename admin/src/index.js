/**
 * Entry point for the GSlider Blocks React SPA Admin Dashboard.
 *
 * Mounts the Single Page Application to the #gslider-admin-dashboard root.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { createRoot, render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Smoke test component for validating React SPA mount lifecycle.
 *
 * @return {JSX.Element} Smoke test view.
 */
const SmokeDashboard = () => {
	return (
		<div className="gslider-dashboard-smoke">
			<div className="gslider-dashboard-smoke-card">
				<h1>{__('GSlider Studio Ready', 'gslider-blocks')}</h1>
				<p>
					{__(
						'React SPA mount container is online and ready for dashboard components.',
						'gslider-blocks'
					)}
				</p>
			</div>
		</div>
	);
};

/**
 * Initializes and mounts the React dashboard application.
 */
const initDashboard = () => {
	const container = document.getElementById('gslider-admin-dashboard');
	if (!container) {
		return;
	}

	if (createRoot) {
		createRoot(container).render(<SmokeDashboard />);
	} else if (render) {
		render(<SmokeDashboard />, container);
	}
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDashboard);
} else {
	initDashboard();
}
