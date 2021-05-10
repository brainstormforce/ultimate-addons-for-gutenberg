/**
 * BLOCK: Post Image - Deprecated Block
 */

const deprecated = [
	{
		save: function(  ) {
            return <div className='uagb-post__image'>
                        <img
                            src={ `${uagb_blocks_info.uagb_url}/admin/assets/images/uagb-10.png` }
                        />
                    </div>
		},
	},
]

export default deprecated;