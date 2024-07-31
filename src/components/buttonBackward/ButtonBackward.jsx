import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

export const ButtonBackward = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='transition-opacity absolute left-0 top-0 h-full opacity-0 hover:first:opacity-100 hover:text-opacity-100 bg-gradient-to-r from-gray-800 w-[400px]' role='button'
                 onClick={() => navigate(-1)}>
                <div className='h-full relative'></div>
            </div>
            <p className='absolute left-0 text-gray-200 flex gap-1 items-center pl-10 pt-8'>
                <ArrowLeftOutlined/>
                Назад
            </p>
        </>
    )
}