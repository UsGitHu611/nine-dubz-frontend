import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";
import {Logo} from "@ui/logo/Logo.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {NavLink} from "react-router-dom";
import {SubMenu} from "@modules/menu/components/submenu/SubMenu.jsx";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";
import {useLogout} from "@modules/menu/hook/useLogout.js";


export const Menu = () => {
    const { isAuth } = useCheckAuth();
    const {t, translation} = useTranslate();
    const logout = useLogout();

    const submenu = [
        {
            element : <p>Русский</p>,
            onClick: () => translation("ru")
        },
        {
            element : <p>Английский</p>,
            onClick: () => translation("eng")
        },
    ]

    return (
        <div className='flex justify-between items-center md-mobile:pr-0
            md-mobile:pl-2 pl-5 pr-2 max-h-[80px] relative'>
            <Logo/>
            <div className='cursor-pointer relative child-[menu]:hover:scale-y-100'>
                <PictureOrSavingLetter/>
                { isAuth ? (
                    <ul id='menu'
                        className='flex flex-col absolute right-0 text-gray-300 scale-y-0 bg-gray-700 origin-top w-[clamp(140px,100%,150px)]'>
                        <li className='hover:bg-gray-300/20'>
                            <NavLink className='w-full block px-4 py-2' to='/studio'>{ t("studio") }</NavLink>
                        </li>
                        <li className='hover:bg-gray-300/20 child-[submenu]:hover:scale-x-100 relative'>
                            <SubMenu id='submenu' subList={submenu}/>
                        </li>
                        <li className='hover:bg-gray-300/20'>
                            <NavLink className='w-full block px-4 py-2' to='/' onClick={logout.mutate}>{ t("logout") }</NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul id='menu'
                        className='flex flex-col absolute right-0 text-gray-300 scale-y-0 bg-gray-700 transition-transform origin-top w-[clamp(140px,100%,150px)]'>
                        <li className='hover:bg-gray-300/20'>
                            <NavLink className='w-full block px-4 py-2' to='/signin'>{ t('login') }</NavLink>
                        </li>
                        <li className='hover:bg-gray-300/20 child-[submenu]:hover:scale-x-100 relative'>
                            <NavLink className='w-full block px-4 py-2' to='/signup'>{ t("registration") }</NavLink>
                        </li>
                        <li className='hover:bg-gray-300/20 child-[submenu]:hover:scale-x-100 relative'>
                            <SubMenu label='Язык' id='submenu' subList={submenu}/>
                        </li>
                    </ul>
                )}

            </div>
        </div>
    )
}