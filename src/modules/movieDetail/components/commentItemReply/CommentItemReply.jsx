import {Avatar, Flex, List} from "antd";
import {ActionPanel} from "@modules/movieDetail/components/actionButtonsPanel/ActionPanel.jsx";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useState} from "react";

export const CommentItemReply = ({title, description, createdAt, subComment, code, userId, parentCommentId, userPicture}) => {
    const [showReplyPanel, setShowReplyPanel] = useState(false);

    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={`${import.meta.env.VITE_DEV_URL}/api/file/${userPicture}`}/>}
                title={<Flex align='center' gap={6}>
                    <p className='text-gray-200'>{title}</p>
                    <small className='text-gray-200/50'>{createdAt}</small>
                    <ActionPanel
                        userId={userId}
                        setShowReplyPanel={setShowReplyPanel}
                        code={code}
                        commentId={subComment}/>
                </Flex>}
                description={
                    <>
                        <p className='text-gray-200 text-[15px] break-all'>{description}</p>
                        { showReplyPanel && (
                            <ReplyPanel
                                code={code}
                                commentId={parentCommentId}
                                setShowReplyPanel={setShowReplyPanel}/>
                        ) }
                    </>}
            />
        </List.Item>
    )
}