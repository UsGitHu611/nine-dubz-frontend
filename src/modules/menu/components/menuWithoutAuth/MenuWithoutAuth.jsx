import {Menu, Avatar} from "antd";
import { Logo } from "@ui/logo/Logo"
import { Link } from "react-router-dom"
import { useTranslate } from "@modules/menu/hook/useTranslate"
import { UserOutlined } from "@ant-design/icons";

const MenuWithoutAuth = () => {
    const { t, translation } = useTranslate();

    return (
        <>
            <Menu
                className='bg-transparent justify-self-end self-center'
                mode='horizontal'
                key='menuWithoutAuth'>

                <Menu.SubMenu key='submenu' style={{lineHeight: "19px"}} icon={
                    <Avatar className='bg-container' src={
                        <UserOutlined style={{ fontSize: "16px" }}/>
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
        </>
    );
}

export default MenuWithoutAuth;