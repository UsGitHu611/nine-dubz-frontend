import {DeleteOutlined} from "@ant-design/icons";
import {Button} from "@components/button/Button.jsx";

export const CoolUploadFileItem = ({ dataURL, deleteFileItem }) => {
    return (
        <li className='w-[120px] aspect-square border-dashed border-2 border-gray-500 rounded-md relative overflow-hidden
        starting-style:scale-0 allow-discrete transition-[transform,display] duration-300'>
            <img className='w-full div-center' src={dataURL} alt="picture-upload"/>
            <Button
                onClick={() => deleteFileItem(null)}
                styles='bg-transparent div-center hover:bg-transparent group'
                title="delete-file"
                icon={<DeleteOutlined className='group-hover:text-red-600 text-xl group-hover:drop-shadow-[0_0_5px_rgb(255,0,0)]'/>}/>
        </li>
    )
}