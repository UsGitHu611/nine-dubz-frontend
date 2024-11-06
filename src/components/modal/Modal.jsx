import {useEffect, useRef} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "@components/button/Button.jsx";

export const Modal = ({ children, showModal, width, setShowModal }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if(showModal){
            dialogRef.current.showModal();
        }
    },[showModal])

    const cancelDialog = () => {
        dialogRef.current.close();
        setShowModal(false);
    }

    return (
        <dialog id='upload' className='bg-gray-800 p-4 rounded-md h-[clamp(500px,100%,600px)]' style={{width}} ref={dialogRef}>
            <div className='flex flex-col h-full'>
                <Button
                    onClick={cancelDialog}
                    icon={<CloseOutlined/>}
                    styles='p-3 rounded-lg ml-auto'/>
                <div className='mt-2 h-full'>
                    { children }
                </div>
            </div>
        </dialog>
    )
}