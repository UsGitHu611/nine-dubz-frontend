import {Menu, Avatar} from "antd";
import {Logo} from "@ui/logo/Logo"
import {LogoutOutlined} from "@ant-design/icons";
import {useTranslate} from "@modules/menu/hook/useTranslate"
import {Link} from "react-router-dom"
import {useLogout} from "@modules/menu/hook/useLogout.js";
import {useCheckAuth} from "@modules/registrationForm/hook/useCheckAuth.js";

const MenuWithAuth = () => {
    const {t, translation} = useTranslate();
    const logout = useLogout();
    const {userInfo} = useCheckAuth();

    const pathImageUser = userInfo?.picture?.name;
    const firstLetterUser = userInfo?.name?.at(0)?.toUpperCase();

    return (
        <div className='flex justify-between items-center md-mobile:px-3'>
            <Logo/>
            <Menu
                className='bg-transparent'
                mode='horizontal'
                key='menuWithAuth'>
                <Menu.SubMenu key='submenu' style={{lineHeight: "19px", padding: "2px"}} icon={
                    pathImageUser
                        ? <Avatar size='large' src={`${import.meta.env.VITE_DEV_URL}/api/file/${pathImageUser}`}/>
                        : <Avatar size='large'>{firstLetterUser}</Avatar>
                }>
                    <Menu.Item key='studio'>
                        <Link to='/studio'>{t("studio")}</Link>
                    </Menu.Item>
                    <Menu.SubMenu title={t("language")}>
                        <Menu.Item key='lang-en'>
                            <p onClick={() => translation('en')}>English</p>
                        </Menu.Item>
                        <Menu.Item key='lang-ru'>
                            <p onClick={() => translation('ru')}>Русский</p>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key='logout' icon={<LogoutOutlined className='pr-2'/>}>
                        <Link to='/' onClick={logout.mutate}>{t("logout")}</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}

export default MenuWithAuth;