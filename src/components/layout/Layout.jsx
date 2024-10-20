import {Header} from "@components/header/Header.jsx"
import {Outlet} from "react-router-dom";
import {SideBarPanel} from "@modules/menu/components/sidebarPanel/SideBarPanel.jsx";


export const Layout = () => {
    return (
        <div className='bg-gray-900 flex flex-col min-h-dvh'>
            <Header/>
            <main className='flex flex-1'>
                <SideBarPanel/>
                <Outlet/>
            </main>
        </div>
    )
}