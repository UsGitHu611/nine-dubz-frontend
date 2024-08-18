import Icon, {CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {useState} from "react";
import MobileReplyPanel from "@modules/movieDetail/components/mobileReplyPanel/MobileReplyPanel.jsx";
import {createPortal} from "react-dom";

const MobileActionPanel = ({ getShortId, userId, code, commentId, setIsOpenMobileMenu, parentId }) => {
    const [showMobileReplyPanel, setShowMobileReplyPanel] = useState(false);
    const { deleteComment, addReply } = useComment();
    const isOwner = getShortId === userId;

    return (
        <div role='dialog' className='fixed inset-0 bg-black/70 animate-in fade-in-80 duration-900'>
            { showMobileReplyPanel && createPortal(
                <MobileReplyPanel
                    code={code}
                    parentId={parentId}
                    addReply={addReply}
                    setIsOpenMobileMenu={setIsOpenMobileMenu}/>,
                document.body,
                'mobileReplyPanel'
            ) }
            <div className='fixed bottom-0 left-0 right-0 bg-black/75 transform-cpu will-change-transform
                backdrop-blur-sm animate-mobile-menu flex flex-col gap-2 px-4 py-2 divide-y divide-white/10'>
                <button
                    className='p-6 flex items-center justify-center gap-2'
                    onClick={() => setShowMobileReplyPanel(true)}>
                    <Icon component={ReplyButton} className='text-[14px]'/>
                    Ответить
                </button>
                {
                    isOwner && (
                        <button
                            className='p-6 flex items-center justify-center gap-2'
                            onClick={() => {
                                deleteComment({code, commentId, parentId});
                                setIsOpenMobileMenu(false);
                            }}>
                            <DeleteOutlined className='text-[14px]'/>
                            Удалить
                        </button>
                    )
                }
                <button
                    className='text-red-600 p-6 flex items-center justify-center gap-2'
                    onClick={() => setIsOpenMobileMenu(false)}>
                    <CloseOutlined className='text-[14px] text-red-600'/>
                    Отмена
                </button>
            </div>
        </div>
    )
}

export default MobileActionPanel