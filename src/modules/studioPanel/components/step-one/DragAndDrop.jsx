import {UploadOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useDragAndDrop} from "@modules/studioPanel/hook/useDragAndDrop.js";
import {createPortal} from "react-dom";

export const DragAndDrop = () => {
    const createMovie = studioStore(state => state.createMovie);
    const dragAndDrop = useDragAndDrop();

    const changeHandler = (evt) => {
        createMovie(evt.target.files[0]);
    }

    return (
        <div
            className='relative border-2 border-dashed border-gray-200/30 rounded h-full flex justify-center items-center cursor-pointer
            data-[isOver]:outline-[5px] data-[isOver]:outline-dashed data-[isOver]:outline-gray-400 data-[isOver]:-outline-offset-2 data-[isOver]:border-none'>
            <label className='absolute inset-0 opacity-0 cursor-pointer' htmlFor="file">
                { createPortal(
                    <dialog ref={dragAndDrop.inputFullscreenRef} id='drop-zone--fullscreen' className='bg-black/85 border-[7px]
                    border-dashed border-gray-400 min-w-[100vw] min-h-dvh overflow-hidden m-0 relative'>
                        <pre className='div-center text-gray-300 text-center text-2xl'>Не бойся, бросай где хочешь! <br/> ヾ(≧へ≦)〃</pre>
                        <input className='w-full aspect-square opacity-0 fixed top-0 left-0' type="file" onChange={changeHandler}/>
                    </dialog>,
                    document.body,
                    "drop-zone--fullscreen")
                }
                <input ref={dragAndDrop.inputRef} className='absolute inset-0 cursor-pointer' id="file" type="file" onChange={changeHandler}/>
            </label>
            <div className='flex flex-col items-center gap-4'>
                <UploadOutlined className='bg-gray-200/10  rounded-full p-5 text-gray-200 text-5xl'/>
                <h3 className='text-gray-100 text-[17px] underline'>
                    Перетащите файлы сюда или нажмите на область, чтобы выбрать их на компьютере.
                </h3>
                <p className='text-gray-300 text-[14px]'>
                    Пока вы не опубликуете видео, доступ к ним будет ограничен.
                </p>
            </div>
        </div>
    )
}