import { Menu, Avatar } from "antd";
import { Logo } from "@ui/logo/Logo"
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslate } from "@modules/menu/hook/useTranslate"
import { Link } from "react-router-dom"
import { useRegister } from "@modules/registrationForm/hook/useRegister";

export const MenuWithAuth = () => {
    const { t, translation } = useTranslate();
    const { userInfo } = useRegister();

    const pathImageUser = userInfo?.picture?.path;
    const firstLetterUser = userInfo?.name?.at(0)?.toUpperCase();

    const menuItemsWithAuth = [
        {
            key: "Movies",
            icon : <Logo/>
        },
        {
            icon : 
            pathImageUser 
            ? <Avatar size='large' src={pathImageUser} className='bg-movie-card'/>
            : <Avatar size='large' className='bg-movie-card'>{firstLetterUser}</Avatar>
            ,
            children : [
                {
                    key: "DubStudio",
                    label: <Link to='/studio'>{ t("studio") }</Link>
                },
                {
                    label: t("language") ,
                    key: "Language",
                    children: [
                        {
                            label: <p onClick={() => translation('en')}>
                                        English
                                    </p>,
                            key: "en",
                        },
                        {
                            label: <p onClick={() => translation('ru')}>
                                        Русский
                                    </p>,
                            key: "ru"
                        },
                    ]
                },
                {
                    label: <Link to='/'>{ t("logout") }</Link>,
                    icon: <LogoutOutlined />,
                    key: "Logout"
                }
            ]
        }
    ];

    return (
        <Menu 
            className='bg-transparent justify-between items-center'
            items={menuItemsWithAuth}
            mode='horizontal' 
            key='menuWithAuth'/>
    );
}
