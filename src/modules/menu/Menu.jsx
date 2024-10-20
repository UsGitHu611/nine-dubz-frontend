import MenuWithAuth from "./components/menuWithAuth/MenuWithAuth";
import MenuWithoutAuth from "./components/menuWithoutAuth/MenuWithoutAuth";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";
import {BurgerButton} from "@modules/menu/components/burgerButton/BurgerButton.jsx";
import {Logo} from "@ui/logo/Logo.jsx";


export const Menu = () => {
    const { isAuth } = useCheckAuth();

    return (
        <div className='flex justify-between items-center md-mobile:pr-0
            md-mobile:pl-2 pl-5 pr-2 max-h-[80px] relative'>
            <div className='flex items-center grow gap-9 md-mobile:gap-0'>
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