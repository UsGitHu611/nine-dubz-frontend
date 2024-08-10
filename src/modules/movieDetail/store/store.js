import {create} from "zustand";

export const movieDetailStore = create((set) => ({
    commentList: [],
    subCommentList: {},

    getComments: async (code) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                set({commentList: [...data?.comments]})
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
                            ...data
                        ],
                    }
                }))
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
            return await response.json();
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
            return await response.json();
        } catch (e) {
            console.log(e.message)
        }
    },

    deleteComment: async ({code, commentId}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${commentId}`, {
                method: "DELETE",
                credentials: "include",
            });
            return await response.json();
        } catch (e) {
            console.log(e.message)
        }
    }
}))