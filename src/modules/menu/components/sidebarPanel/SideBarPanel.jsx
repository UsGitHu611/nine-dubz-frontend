import {SidebarTabList} from "@modules/menu/components/sidebarTabList/SidebarTabList.jsx";
import {storeMenu} from "@modules/menu/store/store.js";
import SubscriptionList from "@modules/menu/components/subscriptionList/SubscriptionList.jsx";
import {MiniSideBarPanel} from "@modules/menu/components/miniSideBarPanel/MiniSideBarPanel.jsx";

export const SideBarPanel = () => {
    const showSideMenu = storeMenu(state => state.showSideMenu);
    return (
        <>
            { showSideMenu ? (
                <div className='px-2 py-1 w-[220px] flex flex-col gap-2 text-gray-200 divide-y divide-white/20' role='navigation'>
                    <SidebarTabList/>
                    <SubscriptionList/>
                </div>
            ) : <MiniSideBarPanel/>
            }
        </>
    )
}