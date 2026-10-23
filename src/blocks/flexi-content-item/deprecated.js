import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import attributes from './attributes';

const v1_2_0 = {
	attributes,
	supports: {
		html: false,
		className: false,
		customClassName: false,
	},
	save( { attributes } ) {
		const { blockId } = attributes;

		const blockProps = useBlockProps.save( {
			className: `flexi-content-item swiper-slide ${ blockId }`,
		} );

		return (
			<div { ...blockProps }>
				<div className="gslider-content-wrapper">
					<div className="gslider-content-inner-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export default [ v1_2_0 ];
