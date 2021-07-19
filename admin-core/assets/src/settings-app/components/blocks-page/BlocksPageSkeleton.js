import React from 'react';

import { SpacerSkeleton, TextSkeleton } from '@Skeleton';

import './BlocksPageSkeleton.scss';

function FlowRowSkeleton() {
	return (
		<>
			<div className="uag-blocks-nav__contents">
				{ Array( 4 )
					.fill()
					.map( () => {
						return (
							<>
								<div className="uag-settings-nav__content">
									<TextSkeleton
										fontSize="20px"
										width="225px"
									/>
									<TextSkeleton width="80%" />
									<SpacerSkeleton />
								</div>
								<div className="uag-settings-nav__content">
									<TextSkeleton
										fontSize="20px"
										width="225px"
									/>
									<TextSkeleton width="80%" />
									<SpacerSkeleton />
								</div>
								<div className="uag-settings-nav__content">
									<TextSkeleton
										fontSize="20px"
										width="225px"
									/>
									<TextSkeleton width="80%" />
									<SpacerSkeleton />
								</div>
							</>
						);
					} ) }
			</div>
		</>
	);
}

export default FlowRowSkeleton;
