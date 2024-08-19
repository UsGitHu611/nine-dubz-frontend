import {HomeOutlined, PlaySquareOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export const MiniSideBarPanel = () => {

    return (
        <div className='px-2 flex flex-col gap-2 text-gray-200' role='navigation'>
            <Link className='px-3 w-[64px] h-[74px] gap-1 py-2 text-center flex flex-col justify-center
                items-center text-[10px] hover:text-inherit hover:bg-white/20 focus:bg-white/20 rounded-lg' to='/'>
                <HomeOutlined className='text-lg'/>
                Главная
            </Link>
            <Link className='p-1 w-[64px] h-[74px] gap-1 text-center flex flex-col justify-center items-center
                text-[10px] hover:text-inherit hover:bg-white/20 focus:bg-white/20 rounded-lg' to='/subscription'>
                <PlaySquareOutlined className='text-lg'/>
                Подписки
            </Link>
        </div>
    )
}