import {Menu, Avatar} from "antd";
import { Logo } from "@ui/logo/Logo"
import { Link } from "react-router-dom"
import { useTranslate } from "@modules/menu/hook/useTranslate"
import { UserOutlined } from "@ant-design/icons";

export const MenuWithoutAuth = () => {
    const { t, translation } = useTranslate();

    const menuItemsWithoutAuth = [
        {
            key: "Movies",
            icon : <Logo/>
        },
        {
            key: "reg",
            icon : <Avatar className='bg-movie-card'><UserOutlined /></Avatar>,
            children : [
                {
                    label: <Link to='/signin'>{ t('login') }</Link>,
                    key: "SignIn"
                },
                {
                    label: <Link to='/signup'>{ t("registration") }</Link>,
                    key: "SignUp"
                },
                {
                    label: t("language") ,
                    key: "Language",
                    children: [
                        {
                            label: <p onClick={() => translation('en')}>
                                        English
                                    </p>,
                            key: "en"
                        },
                        {
                            label: <p onClick={() => translation('ru')}>
                                        Русский
                                    </p>,
                            key: "ru"
                        },
                    ]
                }
            ]
        }
    ];

    return (
        <Menu
            className='bg-transparent justify-between items-center'
            items={menuItemsWithoutAuth}
            mode='horizontal'
            key='menuWithoutAuth'/>
    );
}