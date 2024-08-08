import { create } from "zustand";

export const useRegistrationStore = create((set, get) => ({
    isUnique : false,
    isAuth: false,
    googleUrl : '',
    formData : {
        login: '',
        email : '',
        password: ''
    },
    userInfo : {
        picture: { path: '' },
        name: '',
        email: '',
    },

    setAuth : (bool) => set({isAuth : bool}),
    changeLogin : (value) => set(state => ({
        formData: {...state, login: value}
    })),

    checkUniqueLogin : async(signal) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/user/check-by-name?userName=${get().formData.login}`,{ signal });
            const data = await response.json();
            set({ isUnique: data.isUserExists });
        }catch(e){
            console.log(e.message);
        }
    },

    register : async(formData) => {

        try{
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/authorize/inner/register`,
                {
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            );
            return await response.json();
        }catch(e){
            console.log(e.message);
        }
    },

    getUrlGoogle : async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/authorize/google/get-url`);
            const data = await response.json();
            set({ googleUrl: data.url });
        }catch(e){
            console.log(e.message);
        }
    },

    getUserInfo : async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/user/get-short`, {
                credentials: "include"
            });
            const data = await response.json();
            set({ userInfo: data });
            if(response.ok){
                set({ isAuth: true })
            }
            return data;
        }catch(e){
            console.log(e.message);
        }
    }
}))