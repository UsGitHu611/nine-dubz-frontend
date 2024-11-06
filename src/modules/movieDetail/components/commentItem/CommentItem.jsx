import {ReplyList} from "@modules/movieDetail/components/replyList/ReplyList.jsx";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useRef, useState} from "react";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useQuery} from "@tanstack/react-query";
import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";


export const CommentItem = ({ code, commentItem }) => {
    const [offset, setOffset] = useState(0);
    const [showMoreComment, setShowMoreComment] = useState(false);
    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [showReplyList, setShowReplyList] = useState(false);
    const getReplyReq = movieDetailStore(state => state.getReply);
    const subCommentList = movieDetailStore(state => state.subCommentList);



    const { isLoading, refetch } = useQuery({
        queryKey: ['getReply', commentItem.commentId],
        queryFn: () => getReplyReq({code, commentId : commentItem.commentId, offset}),
        enabled: !subCommentList[commentItem.commentId]?.length && !!showReplyList
    });

    const showMoreHandler = () => {
        setShowMoreComment(prev => !prev)
    }

    return (
        <li className='bg-gray-400/10 rounded-[10px] flex p-3 flex-col'>

            <div className='flex gap-3 items-center'>
                <PictureOrSavingLetter/>
                <div className='flex flex-col justify-between'>
                    <TitleComment {...{...commentItem, code, setShowReplyPanel, parentId : commentItem.commentId}}/>
                    <p
                        className={`text-gray-200 text-[14px] break-all line-clamp-3 ${showMoreComment ? 'line-clamp-none' : 'line-clamp-3'}`}>
                        {commentItem.description}
                    </p>
                    { commentItem.description.length > 1000 ? (
                        <span
                            className='text-sm font-sans text-gray-200/55 hover:underline cursor-pointer select-none self-start'
                            role='button'
                            onClick={() => showMoreHandler()}>
                            {!showMoreComment ? "Читать дальше" : "Свернуть"}
                    </span>
                    ) : null }
                </div>
            </div>

            {(!!commentItem.subCommentsCount || !!subCommentList[commentItem.commentId]?.length) && (
                <ReplyList
                    code={code}
                    offset={offset}
                    refetch={refetch}
                    parentId={commentItem.commentId}
                    setOffset={setOffset}
                    isLoading={isLoading}
                    showReplyList={showReplyList}
                    setShowReplyList={setShowReplyList}
                    subCommentsCount={commentItem.subCommentsCount}/>
            )}
            { showReplyPanel && (
                <ReplyPanel
                    code={code}
                    setShowReplyPanel={setShowReplyPanel}
                    parentId={commentItem.commentId}/>
            ) }
        </li>
    )
}