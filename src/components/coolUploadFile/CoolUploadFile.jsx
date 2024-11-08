import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {CoolUploadFileItem} from "@components/coolUploadFile/CoolUploadFileItem.jsx";

export const CoolUploadFile = ({ name, src = null }) => {
    const [baseURL,setBaseURL] = useState(src);
    const fileReader = new FileReader();

    const coolUploadFileHandler = (evt) => {
        const blob = new Blob([evt.target.files[0]]);
        fileReader.readAsDataURL(blob);
        fileReader.onload = () => {
            setBaseURL(fileReader.result);
        }
    }

    return (
        <ul className='flex gap-3'>
            { baseURL ? <CoolUploadFileItem dataURL={baseURL} deleteFileItem={setBaseURL}/> : null }
            <li className="max-w-[120px] group">
                <label className="w-[120px] aspect-square border-dashed border-2 border-gray-500 rounded-md relative flex justify-center items-center
                transition-colors duration-300 group-hover:border-gray-300 cursor-pointer">
                    <PlusOutlined className='transition-[colors,transform] duration-300 text-gray-500 text-2xl group-hover:text-gray-300 group-hover:rotate-90'/>
                    <input id="file" type="file" name={name} onChange={coolUploadFileHandler} hidden/>
                </label>
            </li>
        </ul>
    )
}