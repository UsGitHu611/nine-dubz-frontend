import {Menu, Avatar} from "antd";
import { Logo } from "@ui/logo/Logo"
import { Link } from "react-router-dom"
import { useTranslate } from "@modules/menu/hook/useTranslate"
import { UserOutlined } from "@ant-design/icons";

const MenuWithoutAuth = () => {
    const { t, translation } = useTranslate();

    return (
        <div className='flex justify-between items-center px-3'>
            <Logo/>
            <Menu
                className='bg-transparent'
                mode='horizontal'
                key='menuWithoutAuth'>

                <Menu.SubMenu key='submenu' style={{lineHeight: "19px"}} icon={
                    <Avatar className='rounded-full bg-container p-2' src={
                        <UserOutlined style={{ fontSize: "23px" }}/>
                    }/>
                }>
                    <Menu.Item key='login'>
                        <Link to='/signin'>{ t('login') }</Link>
                    </Menu.Item>
                    <Menu.Item key='registration'>
                        <Link to='/signup'>{ t("registration") }</Link>
                    </Menu.Item>

                    <Menu.SubMenu key='language' title={t("language") }>
                        <Menu.Item key='language-en'>
                            <p onClick={() => translation('en')}>English</p>
                        </Menu.Item>
                        <Menu.Item key='language-ru'>
                            <p onClick={() => translation('ru')}>Русский</p>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}

export default MenuWithoutAuth;