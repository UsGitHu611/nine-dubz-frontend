import { Container } from "@components/container/Container.jsx";
import { Menu } from "@modules/menu/Menu.jsx";
import { Layout as LayoutAntd } from "antd";

export const Header = () => {

    return (
        <LayoutAntd.Header className='bg-gray-900 h-auto pt-2 lg-mobile:px-4 md-mobile:px-3'>
            <Container>
                <Menu/>
            </Container>
        </LayoutAntd.Header>
    )
}