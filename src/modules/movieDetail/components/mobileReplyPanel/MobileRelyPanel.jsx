import {MobileBottomPanelHeader} from "@modules/movieDetail/components/mobilePanelHeader/MobilePanelHeader.jsx";
import {MobileReplyList} from "@modules/movieDetail/components/mobileReplyList/MobileReplyList.jsx";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {
    MobileBottomPanelFooter
} from "@modules/movieDetail/components/mobileBottomPanelFooter/MobileBottomPanelFooter.jsx";

const MobileRelyPanel = ({ isOpenMobileMenu, setIsOpenMobileMenu, parentId }) => {
    const dynamicSubCommentCount = movieDetailStore(state => state.commentList)['a' + parentId]?.subCommentsCount;

    return (
        <div className={`${isOpenMobileMenu ? 'translate-x-0' : 'translate-x-full' }  
            w-full transition-transform will-change-transform transform-cpu duration-400 
             fixed bottom-0 right-0 top-0 text-gray-200 bg-gray-900
             overscroll-smooth z-[1000002]`}>
            <MobileBottomPanelHeader setShowMobileBottomPanel={setIsOpenMobileMenu}>
                {`Ответы ${dynamicSubCommentCount}`}
            </MobileBottomPanelHeader>
            <MobileReplyList
                parentId={parentId}
                isOpenMobileMenu={isOpenMobileMenu}/>
            <MobileBottomPanelFooter
                parentId={parentId}
                panelType='text'
                placeholder='Напишите ответ..'/>
        </div>
    )
}

export default MobileRelyPanel;