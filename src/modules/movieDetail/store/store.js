import {create} from "zustand";

export const movieDetailStore = create((set, get) => ({
    commentList: {},
    subCommentList: {},
    dynamicCountSubComment : 0,

    getComments: async (code) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                set(({
                    commentList: data?.comments.reduce((prevV, currV) => {
                        return {
                            ...prevV,
                            ['a' + currV.id] : currV
                        }
                    }, {})
                }))
            }
            return data;
        } catch (e) {
            console.log(e.message);
        }
    },

    getReply: async ({code, commentId, offset, limit}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${commentId}?offset=${offset}&limit=${limit}`, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                set(prev => ({
                    subCommentList: {
                        ...prev.subCommentList,
                        [commentId] : [
                            ...prev.subCommentList[commentId] || [],
                            ...data,
                        ]
                    }
                }))
                set(prev => ({dynamicCountSubComment : prev.dynamicCountSubComment + data?.length}))
            }
            return data;
        } catch (e) {
            console.log(e.message)
        }
    },

    addComment: async ({comment, code}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({text: comment})
            });
            const data = await response.json();
            if(response.ok){
                const { id } = data;
                set(prev => ({
                    commentList : {
                        ['a' + id] : data,
                        ...prev.commentList,
                    }
                }))
            }
            return data;
        } catch (e) {
            console.log(e.message)
        }
    },

    addReply: async ({code, parentId, text}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${parentId}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({text})
            });
            const data = await response.json();
            set(prev => ({
                dynamicCountSubComment : prev.dynamicCountSubComment + 1
            }))
            if(response.ok){
                set(prev => ({
                    subCommentList : {
                        ...prev.subCommentList,
                        [parentId] : [
                            ...prev.subCommentList[parentId] || [],
                            data
                        ]
                    }
                }))
            }
            return data
        } catch (e) {
            console.log(e.message)
        }
    },

    deleteComment: async ({code, commentId, parentId}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${commentId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await response.json();
            if(response.ok){
                const delList = get().commentList['a' + commentId] ? 'commentList' : 'subCommentList';
                if(delList === 'commentList'){
                    set(prev => {
                        delete prev.commentList['a' + commentId];
                        return {
                            commentList : { ...prev.commentList }
                        };
                    })
                }else {
                    set(prev => ({
                        subCommentList : {
                            [parentId] : prev.subCommentList[parentId].filter(({ id }) => commentId !== id )
                        }
                    }))
                }
            }
            return data;
        } catch (e) {
            console.log(e.message)
        }
    }
}))