/**
 * BLOCK: Fse Post Navigation - Save Block
 */

const { __ } = wp.i18n
const { select, useSelect } = wp.data;

export default function save( props ) {
    const { attributes } = props

    const {
		block_id,
        menuitem,
        menu_id,
        layout
    } = attributes

    if (  menuitem === undefined || menuitem === null) {
        return __('No Data Found', 'ultimate-addons-for-gutenberg')
    }else if(menuitem.length === 0){
        return __('No Data Found', 'ultimate-addons-for-gutenberg')
    }
    if (  menu_id === undefined || menu_id === null) {
        return __('Please Select Navigation Menu', 'ultimate-addons-for-gutenberg')
    }

    return <div className={`uagb-fse-navigation__wrap uagb-block-${ block_id } uagb-fse-navigation-${layout}`}>
                {menuitem.map((item, index) => {
                        if(menu_id == item.menus[0]){
                            return <li className="uagb-menu-list"><a href={item.url}>{item.title.raw}</a></li>
                        }
                    })
                }
            </div>
}
