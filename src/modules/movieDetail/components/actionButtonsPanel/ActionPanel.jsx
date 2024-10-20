import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";


export const ActionPanel = ({ code, commentId, setShowReplyPanel, userId, parentId, children }) => {
    const getShortId = useRegistrationStore(state => state.userInfo?.id);
    const { deleteComment } = useComment();

    return (
        <div className='flex gap-[2px] items-center md-mobile:ml-auto'>
            <div className='md-mobile:hidden'>
                <Button
                    size='small'
                    type='text'
                    shape='circle'
                    onClick={() => setShowReplyPanel(true)}
                    icon={<ReplyButton/>} />
                {
                    getShortId === userId && (
                        <Button
                            size='small'
                            type='text'
                            shape='circle'
                            onClick={() => deleteComment({code, commentId, parentId})}
                            icon={<DeleteOutlined className='text-[14px]'/>} />
                    )
                }
            </div>
            { children }
        </div>
    )
}