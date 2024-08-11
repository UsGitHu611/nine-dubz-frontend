import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useMutation} from "@tanstack/react-query";

export const useComment = () => {
    const addCommentReq = movieDetailStore(state => state.addComment);
    const deleteCommentReq = movieDetailStore(state => state.deleteComment);
    const addReplyReq = movieDetailStore(state => state.addReply);


    const { mutate : addComment } = useMutation({
        mutationKey: ['addComment'],
        mutationFn: (body) => addCommentReq(body)
    });

    const { mutate : deleteComment } = useMutation({
        mutationKey: ['deleteComment'],
        mutationFn: (body) => deleteCommentReq(body)
    });

    const { mutate : addReply } = useMutation({
        mutationKey: ['addReply'],
        mutationFn: (body) => addReplyReq(body)
    });

    return { addComment, addReply, deleteComment }
}