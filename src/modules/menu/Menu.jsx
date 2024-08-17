import MenuWithAuth from "./components/menuWithAuth/MenuWithAuth";
import MenuWithoutAuth from "./components/menuWithoutAuth/MenuWithoutAuth";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";
import {Container} from "@components/container/Container.jsx";


export const Menu = () => {
    const {isAuth} = useCheckAuth();

    return (
        <Container>
            { isAuth ?
                <MenuWithAuth key='menuWithAuth'/> :
                <MenuWithoutAuth key='menuWithoutAuth'/> }
        </Container>
    )
}