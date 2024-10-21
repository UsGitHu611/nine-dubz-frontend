import {MobileBottomPanelHeader} from "@modules/movieDetail/components/mobilePanelHeader/MobilePanelHeader.jsx";
import {
    MobileBottomPanelFooter
} from "@modules/movieDetail/components/mobileBottomPanelFooter/MobileBottomPanelFooter.jsx";
import {useSwipeCommentPanel} from "@modules/movieDetail/hook/useSwipeCommentPanel.js";


const MobileCommentPanel = ({showMobileBottomPanel, setShowMobileBottomPanel, children}) => {
    const swipePanel = useSwipeCommentPanel({setShowMobileBottomPanel});

    return (
        <div
            ref={swipePanel.panelRef}
            onTouchStart={swipePanel.onTouchStart}
            onTouchMove={swipePanel.onTouchMove}
            onTouchEnd={swipePanel.onTouchEnd}
            style={{
                transform: `translateY(${showMobileBottomPanel ? '0' : '100%'})`
            }}
            className={`
             transition-transform will-change-transform transform-cpu duration-500
             fixed bottom-0 right-0 text-gray-200 h-2/3 left-0 bg-gray-900`}>
            <MobileBottomPanelHeader setShowMobileBottomPanel={setShowMobileBottomPanel}>
                Комментарии
            </MobileBottomPanelHeader>
            {children}
            <MobileBottomPanelFooter panelType='comment' placeholder='Напишите комментарий..'/>
        </div>
    )
}

export default MobileCommentPanel;