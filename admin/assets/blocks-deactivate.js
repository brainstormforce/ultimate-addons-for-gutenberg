const uagb_deactivated_blocks = uagb_deactivate_blocks.deactivated_blocks;
// If we are recieving an object, let's convert it into an array.
if ( uagb_deactivated_blocks.length ) {
	if ( typeof wp.blocks.unregisterBlockType !== 'undefined' ) {
		for ( block_index in uagb_deactivated_blocks ) {
			wp.blocks.unregisterBlockType(
				uagb_deactivated_blocks[ block_index ]
			);
		}
	}
}
