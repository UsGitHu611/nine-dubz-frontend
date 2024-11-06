import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useState} from "react";
import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";

export const CommentItemReply = ({title, description, createdAt, code, userId, parentId, commentId}) => {
    const [showReplyPanel, setShowReplyPanel] = useState(false);

    return (
        <li className='flex p-3 flex-col'>
            <div className='flex gap-3 items-center'>
                <PictureOrSavingLetter/>
                <div className='flex flex-col justify-between'>
                    <TitleComment {...{title, createdAt, code, userId, commentId, setShowReplyPanel, parentId}}/>
                    <p className='text-gray-200 text-[15px] break-all'>{description}</p>
                </div>
            </div>
            { showReplyPanel && (
                <ReplyPanel
                    code={code}
                    parentId={parentId}
                    commentId={commentId}
                    setShowReplyPanel={setShowReplyPanel}/>
            ) }
        </li>
    )
}