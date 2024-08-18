import {Button} from "antd";
import Icon, {DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";
import {lazy, useState} from "react";
import {createPortal} from "react-dom";

const MobileActionPanel = lazy(() => import('../mobileActionPanel/MobileActionPanel.jsx'));

export const ActionPanel = ({ code, commentId, setShowReplyPanel, userId, parentId }) => {
    const getShortId = useRegistrationStore(state => state.userInfo?.id);
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    const { deleteComment } = useComment();

    return (
        <div className='flex gap-[2px] items-center md-mobile:ml-auto'>
            <div className='md-mobile:hidden'>
                <Button
                    size='small'
                    type='text'
                    shape='circle'
                    onClick={() => setShowReplyPanel(true)}
                    icon={<Icon component={ReplyButton} className='text-[14px]'/>} />
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
            <Button
                shape='circle'
                type='text'
                onClick={() => setIsOpenMobileMenu(true)}
                className='hidden md-mobile:flex md-mobile:items-center md-mobile:justify-center md-mobile:text-xl'>
                <MoreOutlined className='text-white'/>
            </Button>
            { isOpenMobileMenu && createPortal(
                <MobileActionPanel
                    setIsOpenMobileMenu={setIsOpenMobileMenu}
                    isOpenMobileMenu={isOpenMobileMenu}
                    getShortId={getShortId}
                    parentId={parentId}
                    commentId={commentId}
                    userId={userId}
                    code={code}
                />
                , document.body, 'mobileActionPanel') }
        </div>
    )
}