import {useEffect, useRef} from "react";

const MobileReplyPanel = ({setIsOpenMobileMenu, addReply, code, parentId}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.addEventListener('input', (e) => {
            e.target.style.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 2 + "px"
        })
    },[])

    return (
        <div role='dialog' className='fixed top-1/3 left-0 right-0 p-3 z-50 animate-in fade-in-5'>
            <textarea autoFocus className='resize-none w-full bg-black/95 backdrop-blur-sm p-3
            outline-0 max-h-[180px] border-[0.01px] border-white/20 rounded'
                      ref={textareaRef}
                      rows={3}
                      placeholder='Напишите ответ..'></textarea>
            <button
                onClick={() => {
                    addReply({ code, parentId, text : textareaRef.current?.value })
                    setIsOpenMobileMenu(false)
                }}
                className='bg-black/95 text-lg px-5 py-2 rounded border-[0.01px] border-white/20'>
                Ответить
            </button>
        </div>
    )
}

export default MobileReplyPanel;