import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useComment = () => {
    const addCommentReq = movieDetailStore(state => state.addComment);
    const deleteCommentReq = movieDetailStore(state => state.deleteComment);
    const addReplyReq = movieDetailStore(state => state.addReply);
    const queryClient = useQueryClient();

    const { mutate : addComment } = useMutation({
        mutationKey: ['addComment'],
        mutationFn: (body) => addCommentReq(body),
        onSuccess : () => queryClient.invalidateQueries('getComments')
    });

    const { mutate : deleteComment } = useMutation({
        mutationKey: ['deleteComment'],
        mutationFn: (body) => deleteCommentReq(body),
        onSuccess : () => queryClient.invalidateQueries('getComments')
    });

    const { mutate : addReply } = useMutation({
        mutationKey: ['addReply'],
        mutationFn: (body) => addReplyReq(body),
        onSuccess : () => queryClient.invalidateQueries('getComments')
    });

    return {
        addComment,
        addReply,
        deleteComment
    }
}