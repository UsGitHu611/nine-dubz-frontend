import MenuWithAuth from "./components/menuWithAuth/MenuWithAuth";
import MenuWithoutAuth from "./components/menuWithoutAuth/MenuWithoutAuth";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";


export const Menu = () => {
    const {isAuth} = useCheckAuth();
    return (
        <>
            { isAuth ? <MenuWithAuth/> : <MenuWithoutAuth/> }
        </>
    )
}