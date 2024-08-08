import {Avatar, Flex, List} from "antd";
import {ActionPanel} from "@modules/movieDetail/components/actionButtonsPanel/ActionPanel.jsx";
import {ReplyList} from "@modules/movieDetail/components/replyList/ReplyList.jsx";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useState} from "react";

export const CommentItem = ({ description, createdAt, commentId, title, code, subCommentsCount, subComments, userId, userPicture }) => {
    const [showReplyPanel, setShowReplyPanel] = useState(false);

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
                            code={code}
                            userId={userId}
                            commentId={commentId}
                            subCommentsCount={subCommentsCount}
                            subComments={subComments}/>
                    )}
                    { showReplyPanel && (
                        <ReplyPanel
                            code={code}
                            setShowReplyPanel={setShowReplyPanel}
                            commentId={commentId}/>
                    ) }
                </>}
            />
        </List.Item>
    )
}