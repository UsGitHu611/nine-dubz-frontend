import {useContext, useEffect, useRef} from "react";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";

export const useSwipeAction = ({ parentId, commentId, userId }) => {
    const deleteCommentReq = movieDetailStore(state => state.deleteComment);
    const getShortId = useRegistrationStore(state => state.userInfo?.id);
    const commentListContext = useContext(MobileCommentContext);
    const isOwnerReply = getShortId === userId;

    const { mutate : deleteComment } = useMutation({
        mutationKey: ['deleteComment', commentId],
        mutationFn: (body) => deleteCommentReq(body),
    });

    const comRef = useRef(null);
    let startPosX = 0;
    let diffX = 0;

    useEffect(() => {
        let halfOfHalf = Math.floor(comRef.current.clientWidth / 8);

        const touchStartHandler = (ev) => {
            startPosX = ev.touches[0].clientX;
            ev.target.setAttribute('drag', '');
        }

        const touchMoveHandler = (ev) => {
            const { clientX } = ev.targetTouches[0];
            diffX = startPosX - clientX;

            if(!isOwnerReply && diffX >= 0) return;

            if (-halfOfHalf >= diffX) {
                ev.target.setAttribute('reply', '')
                return;
            }

            if (halfOfHalf <= diffX) {
                ev.target.setAttribute('delete', '')
                return;
            }

            ev.target.removeAttribute('reply');
            ev.target.removeAttribute('delete');
            ev.target.style.transform = `translateX(${-diffX}px)`;
        }

        const touchEndHandler = (ev) => {
            let diffEnd = startPosX - ev.changedTouches[0].clientX;

            if (diffEnd >= halfOfHalf && isOwnerReply) {
                deleteComment({
                    code : commentListContext.code,
                    parentId,
                    commentId
                })
            }
            ev.target.removeAttribute('drag');
            ev.target.removeAttribute('reply');
            ev.target.style.transform = `translateX(0px)`;
        }

        comRef.current.addEventListener("touchstart", touchStartHandler)
        comRef.current.addEventListener("touchmove", touchMoveHandler)
        comRef.current.addEventListener("touchend", touchEndHandler)

        return () => {
            document.removeEventListener("touchstart",touchStartHandler)
            document.removeEventListener("touchmove",touchMoveHandler)
            document.removeEventListener("touchend",touchEndHandler)
        }

    },[])

    return { comRef }
}