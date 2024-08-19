import {Header} from "@components/header/Header.jsx"
import {Footer} from "@components/footer/Footer.jsx";
import {Outlet} from "react-router-dom";
import {SideBarPanel} from "@modules/menu/components/sidebarPanel/SideBarPanel.jsx";


export const Layout = () => {
    return (
        <div className='bg-gray-900 flex flex-col min-h-[100vh]'>
            <Header/>
            <main className='flex flex-1'>
                <SideBarPanel/>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}