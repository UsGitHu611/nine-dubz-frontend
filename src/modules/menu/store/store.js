import {create} from "zustand";

export const storeMenu = create(() => ({

    logout : async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/authorize/inner/logout`,{
                credentials: "include"
            });
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    }
}))