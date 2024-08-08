import {create} from "zustand";

export const movieDetailStore = create((set) => ({
    commentList : [],

    getComments : async (code) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`,{
            credentials: "include"
        });
        const data = await response.json();
        if(response.ok){
            set({commentList : [...data?.comments]})
        }
        return data;
      }catch (e) {
          console.log(e.message);
      }
    },

    addComment : async ({comment, code}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}`,{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({text : comment})
            });
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    addReply : async ({code, commentId, text}) => {
        console.log({code, commentId, text})
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${commentId}`,{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({text})
            });
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    deleteComment : async ({code, commentId}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/comment/${code}/${commentId}`,{
                method: "DELETE",
                credentials: "include",
            });
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    }
}))