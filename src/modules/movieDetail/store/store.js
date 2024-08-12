import {create} from "zustand";

export const movieDetailStore = create((set, get) => ({
    commentList: {},
    subCommentList: {},

    getComments: async (code) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                set(({
                    commentList: {
                        ...data?.comments.reduce((prevV, currV) => {
                            return {
                                ...prevV,
                                ['a' + currV.id] : currV
                            }
                        }, {}),
                        commentsCount : data.commentsCount
                    }
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
                }));
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
                set(prev => ({
                    commentList : {
                        ...prev.commentList,
                        commentsCount: prev.commentList.commentsCount + 1
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
                set(prev => ({
                    commentList: {
                        ...prev.commentList,
                        ['a' + parentId] : {
                            ...prev.commentList['a' + parentId],
                            subCommentsCount: prev.commentList['a' + parentId].subCommentsCount + 1
                        }
                    }
                }))
                console.log(get().commentList)
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
                            commentList : {
                                ...prev.commentList,
                                commentsCount : prev.commentList.commentsCount - 1
                            }
                        };
                    })
                }else {
                    set(prev => ({
                        subCommentList : {
                            [parentId] : prev.subCommentList[parentId].filter(({ id }) => commentId !== id )
                        }
                    }))
                    set(prev => ({
                        commentList : {
                            ...prev.commentList,
                            ['a' + parentId] : {
                                ...prev.commentList['a' + parentId],
                                subCommentsCount : prev.commentList['a' + parentId].subCommentsCount - 1
                            }
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