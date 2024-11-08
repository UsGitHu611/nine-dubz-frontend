import {Header} from "@components/header/Header.jsx"
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <div className="w-[clamp(250px,100%,1300px)] flex flex-col mx-auto min-h-dvh">
            <Header/>
            <main className='flex justify-center'>
                <Outlet/>
            </main>
        </div>
    )
}