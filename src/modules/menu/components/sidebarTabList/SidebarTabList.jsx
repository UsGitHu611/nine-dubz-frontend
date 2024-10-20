import {HomeOutlined, PlaySquareOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export const SidebarTabList = () => {
    const sideBarMenu = [
        { href : '/', icon : <HomeOutlined className='text-lg'/>, label : 'Главная' },
        { href : '/subscription', icon : <PlaySquareOutlined className='text-lg'/>, label : 'Подписки' },
    ];

    return (
        <ul className='flex flex-col gap-1'>
            {
                sideBarMenu.map(({ href, icon, label }) => (
                    <li key={href}>
                        <Link className='px-3 py-2 flex gap-6 text-[16px] font-medium items-center
                        hover:text-inherit hover:bg-white/20 rounded-lg' to={href}>
                            { icon }
                            { label }
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}