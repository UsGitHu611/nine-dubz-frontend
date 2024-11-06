import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";

export const Author = ({ name }) => {
    return (
        <div className='flex items-center gap-[10px]'>
            <PictureOrSavingLetter/>
            <h3 className='text-gray-200 text-[16px] truncate'>{name}</h3>
        </div>
    )
}