import MenuWithAuth from "./components/menuWithAuth/MenuWithAuth";
import MenuWithoutAuth from "./components/menuWithoutAuth/MenuWithoutAuth";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";
import {Logo} from "@ui/logo/Logo.jsx";

export const Menu = () => {
    const { isAuth } = useCheckAuth();

    return (
        <div className='flex justify-between items-center md-mobile:pr-0
            md-mobile:pl-2 pl-5 pr-2 max-h-[80px] relative'>
            <Logo/>
            {isAuth
                ? <MenuWithAuth key='menuWithAuth'/>
                : <MenuWithoutAuth key='menuWithoutAuth'/>
            }
        </div>
    )
}