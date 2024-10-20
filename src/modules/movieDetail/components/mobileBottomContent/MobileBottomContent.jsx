import {CommentTriggerMobile} from "@modules/movieDetail/components/CommentTriggerMobile/CommentTriggerMobile.jsx";
import MobileCommentPanel from "@modules/movieDetail/components/mobileBottomPanel/MobileCommentPanel.jsx";
import {lazy, useState} from "react";

const MobileCommentList = lazy(() => import('@modules/movieDetail/components/mobileCommentList/MobileCommentList.jsx'))

export const MobileBottomContent = () => {
    const [showMobileBottomPanel, setShowMobileBottomPanel] = useState(false);

    return (
        <div className='hidden md-mobile:block'>
            <CommentTriggerMobile
                setShowMobileBottomPanel={setShowMobileBottomPanel}
            />
            <MobileCommentPanel
                setShowMobileBottomPanel={setShowMobileBottomPanel}
                showMobileBottomPanel={showMobileBottomPanel}>
                <MobileCommentList/>
            </MobileCommentPanel>
        </div>
    )
}