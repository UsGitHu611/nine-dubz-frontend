import {useContext, useEffect, useRef} from "react";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";

export const useSwipeComment = ({ parentId, commentId, userId }) => {
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
    let percentScale = 0;

    useEffect(() => {
        let [, deleteIcon, replyIcon] = comRef.current.children;
        let halfOfHalf = Math.floor(comRef.current?.clientWidth / 8);

        const onTouchStart = (evt) => {
            startPosX = evt.touches[0].clientX;
            evt.target.setAttribute('drag', '');
        }

        const onTouchMove = (evt) => {
            evt.stopPropagation();
            const { clientX } = evt.targetTouches[0];
            diffX = clientX - startPosX;
            percentScale = (diffX / 100) / 0.5;
            if(!isOwnerReply && diffX >= 0) return;

            if (diffX >= halfOfHalf) {
                replyIcon.style.transform = `
                    scale(${percentScale >= 1.1 ? 1.1 : percentScale.toFixed(1)})
                `;
                return;
            }
            if (diffX <= -halfOfHalf) {
                deleteIcon.style.transform = `
                    scale(${percentScale <= 1.1 ? 1.1 : percentScale.toFixed(1)})
                `;
                return;
            }

            deleteIcon.style.transform = 'scale(0)';
            replyIcon.style.transform = 'scale(0)';
            evt.target.style.transform = `translateX(${diffX}px)`;
        }

        const onTouchEnd = (evt) => {
            let diffEnd = startPosX - evt.changedTouches[0].clientX;

            if (diffEnd >= halfOfHalf && isOwnerReply) {
                deleteComment({
                    code : commentListContext.code,
                    parentId,
                    commentId
                })
            }

            deleteIcon.style.transform = 'scale(0)';
            replyIcon.style.transform = 'scale(0)';
            evt.target.style.transform = `translateX(0px)`;
        }

        comRef.current.addEventListener("touchstart", onTouchStart);
        comRef.current.addEventListener("touchmove", onTouchMove);
        comRef.current.addEventListener("touchend", onTouchEnd);

        return () => {
            comRef.current?.removeEventListener("touchstart", onTouchStart);
            comRef.current?.removeEventListener("touchmove", onTouchMove);
            comRef.current?.removeEventListener("touchend", onTouchEnd);
        }
    },[])

    return { comRef }
}