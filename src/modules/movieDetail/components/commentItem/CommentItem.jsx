import {Avatar, Button, Flex, List} from "antd";
import Icon, {DeleteOutlined} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useState} from "react";
import {ReplyPanel} from "@modules/movieDetail/components/replyPanel/ReplyPanel.jsx";

export const CommentItem = ({ description, createdAt, commentId, title, code }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const { deleteComment, addReply } = useComment();

    return (
        <List.Item
            className='bg-gray-400/10 rounded-[10px] mb-3 last:mb-0 items-start'
            actions={[
                <Button onClick={() => setShowReplyInput(true)} type='text' shape='circle' icon={
                    <Icon component={ReplyButton} style={{ fontSize:"20px" }}/>
                }/>,
                <Button onClick={() => deleteComment({code, commentId})} type='text' shape='circle' icon={
                    <DeleteOutlined style={{ fontSize:"20px" }}/>
                }/>
            ]}>
            <List.Item.Meta
                avatar={<Avatar />}
                title={<Flex align='center' gap={6}>
                    <p className='text-gray-200'>{title}</p>
                    <small className='text-gray-200/50'>{createdAt}</small>
                </Flex>}
                description={
                <>
                    <p className='text-gray-200 text-[15px] break-all'>{description}</p>
                    { showReplyInput && (
                        <ReplyPanel
                            code={code}
                            commentId={commentId}
                            addReply={addReply}
                            setShowReplyInput={setShowReplyInput}/>
                    ) }
                </>}
            />
        </List.Item>
    )
}