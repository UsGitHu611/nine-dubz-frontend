import {Avatar, List} from "antd";
import {ReplyList} from "@modules/movieDetail/components/replyList/ReplyList.jsx";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useContext, useState} from "react";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useQuery} from "@tanstack/react-query";
import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";
import {CommentContext} from "@modules/movieDetail/context/CommentContext.js";


export const CommentItem = () => {
    const [offset, setOffset] = useState(0);
    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [showReplyList, setShowReplyList] = useState(false);
    const getReplyReq = movieDetailStore(state => state.getReply);
    const subCommentList = movieDetailStore(state => state.subCommentList);

    const {
        commentId,
        code, 
        title,
        createdAt,
        userId,
        description,
        subCommentsCount,
        userPicture
    } = useContext(CommentContext);

    const { isLoading, refetch } = useQuery({
        queryKey: ['getReply', commentId],
        queryFn: () => getReplyReq({code, commentId, offset}),
        enabled: !subCommentList[commentId]?.length && !!showReplyList
    });

    return (
        <List.Item
            className='bg-gray-400/10 rounded-[10px] mb-3 last:mb-0 items-start'>
            <List.Item.Meta
                avatar={<Avatar src={`${import.meta.env.VITE_DEV_URL}/api/file/${userPicture}`}/>}
                title={<TitleComment {...{title, createdAt, code, userId, commentId, setShowReplyPanel, parentId : commentId}}/>}
                description={
                <>
                    <p className='text-gray-200 text-[14px] line-clamp-1'>{description}</p>
                    { (!!subCommentsCount || !!subCommentList[commentId]?.length) && (
                        <ReplyList
                            code={code}
                            offset={offset}
                            refetch={refetch}
                            parentId={commentId}
                            setOffset={setOffset}
                            isLoading={isLoading}
                            showReplyList={showReplyList}
                            setShowReplyList={setShowReplyList}
                            subCommentsCount={subCommentsCount}/>
                    )}
                    { showReplyPanel && (
                        <ReplyPanel
                            code={code}
                            setShowReplyPanel={setShowReplyPanel}
                            parentId={commentId}/>
                    ) }
                </>}
            />
        </List.Item>
    )
}