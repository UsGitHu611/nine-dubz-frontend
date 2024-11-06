import {useEffect, useRef} from "react";

export const useDragAndDrop = () => {
    const inputRef = useRef(null);
    const inputFullscreenRef = useRef(null);
    let isShower = false;

    useEffect(() => {
        const parentNode = inputRef.current.parentNode.parentNode;

        const getCoordinateModal = (evt) => {
            const rect = inputRef.current.parentNode.getBoundingClientRect();
            isShower = (evt.clientX >= rect.left &&
                evt.clientX <= rect.right &&
                evt.clientY >= rect.top &&
                evt.clientY <= rect.bottom)

        }
        const dragOverHandler = (evt) => {
            evt.preventDefault();
            requestAnimationFrame(() => {
                getCoordinateModal(evt);
            })

            if(isShower){
                inputFullscreenRef.current.close();
                parentNode.setAttribute("data-isOver", true)
            }else{
                inputFullscreenRef.current.showModal();
                parentNode.removeAttribute("data-isOver");
            }
        }

        const dragLeaveHandler = () => {
            inputFullscreenRef.current.close();
        }

        document.addEventListener("dragover", dragOverHandler);
        inputFullscreenRef.current.addEventListener("dragleave", dragLeaveHandler);

        return () => {
            document.removeEventListener("dragover", dragOverHandler);
        }
    },[])

    return {
        inputRef,
        inputFullscreenRef
    }
}