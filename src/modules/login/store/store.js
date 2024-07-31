import {create} from "zustand";

export const storeLogin = create((set) => ({
    message: "",

    login : async (formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/authorize/inner/login`,{
                method: "POST",
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            set({ message: data?.message })
            return data;
        }catch (e) {
            console.log(e.message);
        }
    }
}))