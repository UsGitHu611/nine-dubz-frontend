import { Header } from "@components/header/Header.jsx"
import { Footer } from "@components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Layout as LayoutAntd } from "antd";

const { Content } = LayoutAntd;

export const Layout = () => {

    return (
        <LayoutAntd className='min-h-[100vh] bg-gray-900'>
            <Header/>
                <Content>
                    <Outlet/>
                </Content>
            <Footer/>
        </LayoutAntd>
    )
}