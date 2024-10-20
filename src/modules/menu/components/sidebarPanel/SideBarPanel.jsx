import {SidebarTabList} from "@modules/menu/components/sidebarTabList/SidebarTabList.jsx";
import {storeMenu} from "@modules/menu/store/store.js";
import SubscriptionList from "@modules/menu/components/subscriptionList/SubscriptionList.jsx";
import {MiniSideBarPanel} from "@modules/menu/components/miniSideBarPanel/MiniSideBarPanel.jsx";
import {cookie} from "@/helper/cookie.js";

export const SideBarPanel = () => {
    const showSideMenu = storeMenu(state => state.showSideMenu);

    return (
        <>
            { showSideMenu ? (
                <div className='px-2 py-1 w-[200px] flex flex-col gap-2 text-gray-200
                    divide-y divide-white/20 md-mobile:fixed md-mobile:top-[60px]
                    md-mobile:z-50 md-mobile:bg-gray-900 md-mobile:bottom-0' role='navigation'>
                    <SidebarTabList/>
                    { cookie.findKey('token') ? <SubscriptionList/> : null }
                </div>
            ) : <MiniSideBarPanel/>
            }
        </>
    )
}