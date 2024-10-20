import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {lazy, useState} from "react";
import {useSwipeAction} from "@modules/movieDetail/hook/useSwipeAction.js";
import {DeleteFilled} from "@ant-design/icons";
import {ReplyButton} from "@components/replyButton/ReplyButton.jsx";

const MobileRelyPanel = lazy(() => import('@modules/movieDetail/components/mobileReplyPanel/MobileRelyPanel.jsx'))

export const MobileCommentItem = ({ userPicture, title, description, createdAt, subCommentsCount, commentId, userId }) => {
    const commIntl = new Intl.PluralRules('ru');
    const commIntlVariant = { one : 'Ответ', few : 'Ответа', many : 'Ответов' };
    const [isOpenMobileRelyPanel, setIsOpenMobileRelyPanel] = useState(false);
    const { comRef } = useSwipeAction({commentId, userId});

    return (
        <li ref={comRef} className='relative'>

            <div className='p-5 flex gap-2 items-center py-3
                duration-200 neighbor-variant-[delete]:opacity-100 neighbor-variant-[reply]:opacity-100
                drag:bg-white/5'>
                <PictureOrSavingLetter userPicture={userPicture} userName={title}/>

                <div className='flex flex-col gap-2 flex-grow'>
                    <div className='flex flex-col w-full'>
                        <TitleComment title={title} createdAt={createdAt}/>
                        <p className='text-gray-200 text-[13px] break-all pr-8'>
                            {description}
                        </p>
                    </div>
                    {!!subCommentsCount ? (
                        <button
                            onClick={() => setIsOpenMobileRelyPanel(true)}
                            className='px-5 py-1.5 bg-white/5 rounded-3xl mr-auto'>
                            {`${subCommentsCount} ${commIntlVariant[commIntl.select(subCommentsCount)]}`}
                        </button>
                    ) : null}
                </div>

            </div>


            <div id='delete' className='opacity-0 transition-opacity
                absolute top-0 right-[4%] bottom-0 pointer-events-none flex
                justify-center items-center'>
                <DeleteFilled className='text-xl text-red-600'/>
            </div>

            <div id='reply' className='opacity-0 transition-opacity
                absolute top-0 left-[4%] bottom-0 pointer-events-none
                flex justify-center items-center'>
                <ReplyButton w={20} h={20}/>
            </div>

            <MobileRelyPanel
                parentId={commentId}
                setIsOpenMobileMenu={setIsOpenMobileRelyPanel}
                isOpenMobileMenu={isOpenMobileRelyPanel}/>
        </li>
)}