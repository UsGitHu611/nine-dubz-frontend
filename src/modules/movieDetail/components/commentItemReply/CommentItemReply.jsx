import {Avatar, List} from "antd";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";
import {useState} from "react";
import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";

export const CommentItemReply = ({title, description, createdAt, code, userId, userPicture, parentId, commentId}) => {
    const [showReplyPanel, setShowReplyPanel] = useState(false);

    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={`${import.meta.env.VITE_DEV_URL}/api/file/${userPicture}`}/>}
                title={<TitleComment {...{title, createdAt, code, userId, commentId, setShowReplyPanel, parentId}}/>}
                description={
                    <>
                        <p className='text-gray-200 text-[15px] break-all'>{description}</p>
                        { showReplyPanel && (
                            <ReplyPanel
                                code={code}
                                parentId={parentId}
                                commentId={commentId}
                                setShowReplyPanel={setShowReplyPanel}/>
                        ) }
                    </>}
            />
        </List.Item>
    )
}