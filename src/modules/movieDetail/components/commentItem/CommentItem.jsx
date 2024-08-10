import {Avatar, Flex, List} from "antd";
import {ActionPanel} from "@modules/movieDetail/components/actionButtonsPanel/ActionPanel.jsx";
import {ReplyList} from "@modules/movieDetail/components/replyList/ReplyList.jsx";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useState} from "react";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useQuery} from "@tanstack/react-query";


export const CommentItem = ({ description, createdAt, title, code, subCommentsCount, userId, userPicture, commentId }) => {
    const [offset, setOffset] = useState(0);
    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [showReplyList, setShowReplyList] = useState(false);
    const getReplyReq = movieDetailStore(state => state.getReply);
    const subCommentList = movieDetailStore(state => state.subCommentList);

    const { isLoading, refetch } = useQuery({
        queryKey: ['getReply', commentId],
        notifyOnChangeProps: ['data'],
        queryFn: () => {
            setOffset(prevState => prevState + 10)
            return getReplyReq({code, commentId, offset, limit: 10})
        },
        enabled: !subCommentList[commentId]?.length && !!showReplyList
    });

    return (
        <List.Item
            className='bg-gray-400/10 rounded-[10px] mb-3 last:mb-0 items-start'>
            <List.Item.Meta
                avatar={<Avatar src={`${import.meta.env.VITE_DEV_URL}/api/file/${userPicture}`}/>}
                title={<Flex align='center' gap={6}>
                    <p className='text-gray-200'>{title}</p>
                    <small className='text-gray-200/50'>{createdAt}</small>
                    <ActionPanel
                        code={code}
                        userId={userId}
                        setShowReplyPanel={setShowReplyPanel}
                        commentId={commentId}/>
                </Flex>}
                description={
                <>
                    <p className='text-gray-200 text-[15px] break-all'>{description}</p>
                    { !!subCommentsCount && (
                        <ReplyList
                            parentId={commentId}
                            refetch={refetch}
                            isLoading={isLoading}
                            showReplyList={showReplyList}
                            setShowReplyList={setShowReplyList}
                            setOffset={setOffset}
                            code={code}
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