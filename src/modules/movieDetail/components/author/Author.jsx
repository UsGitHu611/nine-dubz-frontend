import {Avatar} from "antd";

export const Author = ({ picture, name }) => {

    return (
        <div className='flex items-center gap-[10px]'>
            <Avatar size='large' src={`${import.meta.env.VITE_DEV_URL}/api/file/${picture.name}`}/>
            <h3 className='text-gray-200 text-lg'>{name}</h3>
        </div>
    )
}