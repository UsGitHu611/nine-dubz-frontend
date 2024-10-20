import {useRef, useState} from "react";

export const useSwipeCommentPanel = ({setShowMobileBottomPanel}) => {
    const [isDrag, setIsDrag] = useState(false);
    const [differenceY, setDifferenceY] = useState(0);
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1.0);
    const panelRef = useRef(null);
    const half = 7.49 * 50;

    const onTouchStart = (event) => {
        if(event.target.id === "header-mobile-panel"){
            setY(event.targetTouches[0].clientY);
            setIsDrag(prevState => !prevState);
            event.target.classList.add("drag-zone");
            panelRef.current.classList.add("drag");
        }
    }

    const onTouchMove = (event) => {
        if(isDrag){
            setOpacity(1.0 - (((differenceY / half) * 50) / 100).toFixed(1));
            setDifferenceY(Math.trunc(event.targetTouches[0].screenY - y));
            panelRef.current.style.transform = `translateY(${differenceY > 0 ? differenceY : 0}px)`;
            panelRef.current.style.opacity = `${opacity}`;
        }
    }

    const onTouchEnd = () => {
        if(differenceY >= half){
            setShowMobileBottomPanel(false);
        }
        panelRef.current.classList.remove("drag");
        event.target.classList.remove("drag-zone");
        panelRef.current.style.transform = `translateY(0)`;
        panelRef.current.style.opacity = `1`;
        setDifferenceY(0);
        setIsDrag(false);
    }

    return {
        panelRef,
        onTouchStart,
        onTouchMove,
        onTouchEnd
    };
}