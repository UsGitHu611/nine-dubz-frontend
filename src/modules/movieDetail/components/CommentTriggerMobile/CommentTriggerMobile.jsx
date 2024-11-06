import {useContext} from "react";
import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";

export const CommentTriggerMobile = ({ setShowMobileBottomPanel }) => {
    const commentListContext = useContext(MobileCommentContext);

    return (
        <div
            onClick={() => setShowMobileBottomPanel(true)}
            className='bg-gray-400/10 rounded-[10px] flex-col px-3 py-2 pb-3 gap-1 flex'>
            <p className='text-gray-200 text-[15px] font-medium'>
                Комметарии {commentListContext.commentListSource?.length}
            </p>
            <div className='flex items-center gap-2'>
                <PictureOrSavingLetter/>
                <p className='text-gray-200 text-[12px] line-clamp-2 break-all'>
                    {commentListContext.commentListSource?.at(-1).description}
                </p>
            </div>
        </div>
    )
}