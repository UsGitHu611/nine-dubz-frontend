import {MenuOutlined} from "@ant-design/icons";
import {storeMenu} from "@modules/menu/store/store.js";

export const BurgerButton = () => {
    return (
        <button
            onClick={()=>storeMenu.setState(prev => ({ showSideMenu: !prev.showSideMenu }))}
            className='text-gray-200 text-lg h-[40px] w-[40px] rounded-full hover:bg-gray-600 outline-none'>
            <MenuOutlined/>
        </button>
    )
}