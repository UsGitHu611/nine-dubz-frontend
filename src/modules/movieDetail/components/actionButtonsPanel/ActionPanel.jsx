import {Button, Flex} from "antd";
import Icon, {DeleteOutlined} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";

export const ActionPanel = ({code, commentId, setShowReplyPanel, userId, parentId}) => {
    const getShortId = useRegistrationStore(state => state.userInfo?.id);
    const { deleteComment } = useComment();

    return (
        <Flex gap={2}>
            <Button
                size='small'
                type='text'
                shape='circle'
                onClick={() => setShowReplyPanel(true)}
                icon={<Icon component={ReplyButton} style={{ fontSize:"14px" }}/>}/>
            {
                getShortId === userId && (
                    <Button
                        size='small'
                        type='text'
                        shape='circle'
                        onClick={() => deleteComment({code, commentId, parentId})}
                        icon={<DeleteOutlined style={{ fontSize:"14px" }}/>}/>
                )
            }
        </Flex>
    )
}