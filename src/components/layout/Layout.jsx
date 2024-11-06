import {Header} from "@components/header/Header.jsx"
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <div className='flex justify-center'>
            <div className="w-[clamp(250px,100%,1300px)] flex flex-col">
                <Header/>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}