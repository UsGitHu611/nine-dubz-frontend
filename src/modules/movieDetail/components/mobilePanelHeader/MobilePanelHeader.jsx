import {CloseOutlined} from "@ant-design/icons";

export const MobileBottomPanelHeader = ({setShowMobileBottomPanel, children}) => {
    return (
        <div id='header-mobile-panel' className='sticky right-0 left-0 top-0 bg-inherit py-1 px-2.5
            flex justify-between items-center border-b border-white/10 z-[99999] transition-colors duration-500'>
            <span className='text-gray-200 font-medium text-[17px]'>
                {children}
            </span>
            <div id="drag-line" className='absolute w-[150px] rounded-full bg-gray-600/50 h-1.5 top-3 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
                <button onClick={() => setShowMobileBottomPanel(false)} className='hocus:bg-white/10 rounded-lg'>
                <CloseOutlined className='p-4 text-lg'/>
            </button>
        </div>
)
}