import { createSlotFill } from '@wordpress/components';
import { createElement } from '@wordpress/element';

/**
 * Storybook Mock for @wordpress/block-editor InspectorControls.
 * Replaces Gutenberg's strict selected-block check with a clean SlotFill
 * so inspector panels render cleanly in isolated Storybook stories.
 */
const { Fill: InspectorControlsFill, Slot: InspectorControlsSlot } =
	createSlotFill( 'InspectorControls' );

export const InspectorControls = ( { children, ...props } ) => {
	return createElement( InspectorControlsFill, props, children );
};

InspectorControls.Slot = InspectorControlsSlot;

export default {
	InspectorControls,
};
