/**
 * ToolsTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides a 1-click dynamic CSS cache purger and a sanitized system
 * diagnostics report generator with 1-click clipboard export.
 *
 * @since 1.2.0
 */

import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
	CubeIcon,
	SpinnerIcon,
	PurgeCacheIcon,
	TerminalIcon,
	CheckIcon,
	CopyIcon,
	AlertCircleIcon,
	CheckCircleIcon,
	CloseIcon,
} from '../icons';

/**
 * ToolsTab Component.
 *
 * @param {Object}   props                    Component properties.
 * @param {Object}   [props.dashboardData]    Dashboard API data including cache & system metrics.
 * @param {Function} [props.setDashboardData] State setter for parent dashboard data.
 * @return {JSX.Element} The rendered tools tab view.
 */
const ToolsTab = ( { dashboardData, setDashboardData } ) => {
	const [ isPurging, setIsPurging ] = useState( false );
	const [ isReportLoading, setIsReportLoading ] = useState( false );
	const [ systemReport, setSystemReport ] = useState( null );
	const [ isCopied, setIsCopied ] = useState( false );
	const [ toast, setToast ] = useState( null );

	const copyTimeoutRef = useRef( null );
	const toastTimeoutRef = useRef( null );

	// Cleanup timers on unmount
	useEffect( () => {
		return () => {
			if ( copyTimeoutRef.current ) {
				clearTimeout( copyTimeoutRef.current );
			}
			if ( toastTimeoutRef.current ) {
				clearTimeout( toastTimeoutRef.current );
			}
		};
	}, [] );

	/**
	 * Shows a self-dismissing toast notification.
	 *
	 * @param {string} message          The notification message to display.
	 * @param {string} [type='success'] Notification type ('success' or 'error').
	 */
	const showToast = ( message, type = 'success' ) => {
		if ( toastTimeoutRef.current ) {
			clearTimeout( toastTimeoutRef.current );
		}
		setToast( { message, type } );
		toastTimeoutRef.current = setTimeout( () => {
			setToast( null );
		}, 3500 );
	};

	/**
	 * Fetches the detailed system diagnostics report from the REST API.
	 */
	const fetchSystemReport = useCallback( async () => {
		setIsReportLoading( true );
		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/system-report',
			} );

			const reportData = response?.data || response?.report;
			if ( response && response.status === 'success' && reportData ) {
				setSystemReport( reportData );
			}
		} catch ( err ) {
			// Fail gracefully without interrupting UI
		} finally {
			setIsReportLoading( false );
		}
	}, [] );

	// Load system report on mount
	useEffect( () => {
		fetchSystemReport();
	}, [ fetchSystemReport ] );

	/**
	 * Purges generated dynamic CSS files via the REST API.
	 */
	const handlePurgeCache = async () => {
		setIsPurging( true );

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/clear-cache',
				method: 'POST',
			} );

			if ( response && response.status === 'success' ) {
				const deletedCount = response.deleted_files ?? 0;

				// Update parent dashboard data cache stats to 0
				if ( typeof setDashboardData === 'function' ) {
					setDashboardData( ( prev ) => ( {
						...prev,
						cache: {
							files_count: 0,
							total_size_bytes: 0,
							total_size_formatted: '0 KB',
						},
					} ) );
				}

				showToast(
					response.message ||
						sprintf(
							/* translators: %d: number of deleted files */
							__(
								'Dynamic CSS cache purged successfully (%d files removed).',
								'gslider-blocks'
							),
							deletedCount
						),
					'success'
				);
			} else {
				showToast(
					__(
						'Failed to purge dynamic CSS cache. Please try again.',
						'gslider-blocks'
					),
					'error'
				);
			}
		} catch ( err ) {
			showToast(
				__(
					'Failed to purge cache. Please check your user permissions or network connection.',
					'gslider-blocks'
				),
				'error'
			);
		} finally {
			setIsPurging( false );
		}
	};

	/**
	 * Copies the formatted system diagnostic report to the user's clipboard.
	 */
	const handleCopyReport = async () => {
		const textToCopy = systemReport?.formatted_text;
		if ( ! textToCopy ) {
			return;
		}

		try {
			if (
				typeof window !== 'undefined' &&
				window.navigator?.clipboard?.writeText
			) {
				await window.navigator.clipboard.writeText( textToCopy );
			} else if ( typeof document !== 'undefined' ) {
				// Fallback for older browsers
				const textArea = document.createElement( 'textarea' );
				textArea.value = textToCopy;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				document.body.appendChild( textArea );
				textArea.focus();
				textArea.select();
				document.execCommand( 'copy' );
				document.body.removeChild( textArea );
			}

			setIsCopied( true );
			showToast(
				__(
					'System report copied to clipboard successfully.',
					'gslider-blocks'
				),
				'success'
			);

			if ( copyTimeoutRef.current ) {
				clearTimeout( copyTimeoutRef.current );
			}
			copyTimeoutRef.current = setTimeout( () => {
				setIsCopied( false );
			}, 2500 );
		} catch ( err ) {
			showToast(
				__(
					'Failed to copy report to clipboard. Please copy manually from the preview below.',
					'gslider-blocks'
				),
				'error'
			);
		}
	};

	const filesCount = dashboardData?.cache?.files_count ?? 0;
	const totalSizeFormatted =
		dashboardData?.cache?.total_size_formatted ?? '0 KB';

	return (
		<div className="gslider-dashboard-tools-container">
			{ /* Header Description Card */ }
			<div className="gslider-dashboard-card gslider-dashboard-tools-header-card">
				<div className="gslider-dashboard-tools-header">
					<div className="gslider-dashboard-tools-header-left">
						<h2 className="gslider-dashboard-tools-title">
							{ __(
								'System Tools & Diagnostics',
								'gslider-blocks'
							) }
						</h2>
						<p className="gslider-dashboard-tools-desc">
							{ __(
								'Purge pre-compiled dynamic CSS caches and export sanitized diagnostic reports for troubleshooting and GitHub support issues.',
								'gslider-blocks'
							) }
						</p>
					</div>
				</div>
			</div>

			{ /* Tool 1: Dynamic CSS Cache Purger */ }
			<div className="gslider-tools-card">
				<div className="gslider-tools-card-header">
					<div className="gslider-tools-card-info">
						<div className="gslider-tools-card-title-row">
							<span
								className="gslider-tools-card-icon"
								aria-hidden="true"
							>
								<CubeIcon />
							</span>
							<h3 className="gslider-tools-card-title">
								{ __(
									'Dynamic CSS Cache Purger',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-tools-badge is-cached">
								{ __( 'Auto-Generated', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-tools-card-desc">
							{ __(
								'If recent slider design changes or new slides are not appearing on your live site, clear the cache to regenerate fresh stylesheets.',
								'gslider-blocks'
							) }
						</p>
					</div>

					<div className="gslider-tools-card-action">
						<button
							type="button"
							className="gslider-tools-action-btn is-danger"
							onClick={ handlePurgeCache }
							disabled={ isPurging }
							aria-label={ __(
								'Purge dynamic CSS cache',
								'gslider-blocks'
							) }
						>
							{ isPurging ? (
								<>
									<SpinnerIcon width="15" height="15" />
									<span>
										{ __( 'Purging…', 'gslider-blocks' ) }
									</span>
								</>
							) : (
								<>
									<PurgeCacheIcon />
									<span>
										{ __(
											'Purge Dynamic CSS Cache',
											'gslider-blocks'
										) }
									</span>
								</>
							) }
						</button>
					</div>
				</div>

				{ /* Cache Stats Summary Cards */ }
				<div className="gslider-tools-stats-grid">
					<div className="gslider-tools-stat-card">
						<span className="gslider-tools-stat-label">
							{ __( 'Cached Stylesheets', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-stat-value">
							{ filesCount }{ ' ' }
							<span
								style={ { fontSize: '13px', fontWeight: 500 } }
							>
								{ filesCount === 1
									? __( 'file', 'gslider-blocks' )
									: __( 'files', 'gslider-blocks' ) }
							</span>
						</span>
					</div>

					<div className="gslider-tools-stat-card">
						<span className="gslider-tools-stat-label">
							{ __( 'Total Disk Size', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-stat-value">
							{ totalSizeFormatted }
						</span>
					</div>
				</div>
			</div>

			{ /* Tool 2: System Status & Diagnostic Report */ }
			<div className="gslider-tools-card">
				<div className="gslider-tools-card-header">
					<div className="gslider-tools-card-info">
						<div className="gslider-tools-card-title-row">
							<span
								className="gslider-tools-card-icon is-info"
								aria-hidden="true"
							>
								<TerminalIcon />
							</span>
							<h3 className="gslider-tools-card-title">
								{ __(
									'System Status & Diagnostic Report',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-tools-badge is-sanitized">
								{ __( 'Sanitized & Safe', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-tools-card-desc">
							{ __(
								'If you encounter an issue and need help from our support team, click below to copy your system environment details to paste into the support forum. Sensitive credentials and paths are never included.',
								'gslider-blocks'
							) }
						</p>
					</div>

					<div className="gslider-tools-card-action">
						<button
							type="button"
							className={ `gslider-tools-action-btn ${
								isCopied ? 'is-copied' : 'is-secondary'
							}` }
							onClick={ handleCopyReport }
							disabled={ ! systemReport?.formatted_text }
							aria-label={ __(
								'Copy system diagnostic report to clipboard',
								'gslider-blocks'
							) }
						>
							{ isCopied ? (
								<>
									<CheckIcon width="15" height="15" />
									<span>
										{ __(
											'Copied to Clipboard!',
											'gslider-blocks'
										) }
									</span>
								</>
							) : (
								<>
									<CopyIcon />
									<span>
										{ __(
											'Copy System Report',
											'gslider-blocks'
										) }
									</span>
								</>
							) }
						</button>
					</div>
				</div>
			</div>

			{ /* Toast Notification Banner */ }
			{ toast && (
				<div
					className={ `gslider-settings-toast ${
						toast.type === 'error' ? 'is-error' : ''
					}` }
					role="status"
					aria-live="polite"
				>
					<span
						className={ `gslider-settings-toast-icon ${
							toast.type === 'error' ? 'is-error' : ''
						}` }
					>
						{ toast.type === 'error' ? (
							<AlertCircleIcon />
						) : (
							<CheckCircleIcon />
						) }
					</span>
					<span>{ toast.message }</span>
					<button
						type="button"
						className="gslider-settings-toast-close"
						onClick={ () => setToast( null ) }
						aria-label={ __(
							'Close notification',
							'gslider-blocks'
						) }
					>
						<CloseIcon strokeWidth="2.5" />
					</button>
				</div>
			) }
		</div>
	);
};

export default ToolsTab;
