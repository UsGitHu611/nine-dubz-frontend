import {DeleteOutlined, EnterOutlined} from "@ant-design/icons";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";
import {Button} from "@components/button/Button.jsx";


export const ActionPanel = ({ code, commentId, setShowReplyPanel, userId, parentId, children }) => {
    const getShortId = useRegistrationStore(state => state.userInfo?.id);
    const actionComment = useComment();

    return (
        <div className='flex gap-[2px] items-center'>

            <div className='flex gap-1'>
                <Button
                    styles='bg-transparent p-1'
                    onClick={() => setShowReplyPanel(true)}
                    icon={<EnterOutlined className='transform-[180,360]'/>} />
                {
                    getShortId === userId && (
                        <Button
                            styles='bg-transparent p-1'
                            onClick={() => actionComment.deleteComment({code, commentId, parentId})}
                            icon={<DeleteOutlined className='text-[14px]'/>} />
                    )
                }
            </div>
            { children }
        </div>
    )
}