import {create} from "zustand";

export const storeMenu = create(() => ({
    showSideMenu : false,

    logout : async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/authorize/inner/logout`,{
                credentials: "include"
            });
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    getUsersChanel: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/subscription`,{
                credentials: "include"
            });
            return response.json();
        }catch (e) {
            console.log(e.message)
        }
    }
}))