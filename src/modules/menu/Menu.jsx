import MenuWithAuth from "./components/menuWithAuth/MenuWithAuth";
import MenuWithoutAuth from "./components/menuWithoutAuth/MenuWithoutAuth";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";
import {Logo} from "@ui/logo/Logo.jsx";
import {BurgerButton} from "@modules/menu/components/burgerButton/BurgerButton.jsx";


export const Menu = () => {
    const {isAuth} = useCheckAuth();

    return (
        <div className='flex justify-between items-center px-3 pr-7'>
            <div className='flex items-center gap-10'>
                <BurgerButton/>
                <Logo/>
            </div>
            {isAuth
                ? <MenuWithAuth key='menuWithAuth'/>
                : <MenuWithoutAuth key='menuWithoutAuth'/>
            }
        </div>
    )
}