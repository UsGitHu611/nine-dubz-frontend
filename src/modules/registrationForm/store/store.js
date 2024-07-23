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
    changeLogin : (value) => set(state => ({
        formData: {...state, login: value}
    })),

    checkUniqueLogin : async(signal) => {
        try{
            const response = await fetch(`http://localhost:25565/api/user/check-by-name?userName=${get().formData.login}`,{ signal });
            const data = await response.json();
            set({ isUnique: data.isUserExists });
        }catch(e){
            console.log(e.message);
        }
    },

    register : async(formData) => {
        try{
            const response = await fetch('http://localhost:25565/api/authorize/inner/register',
                {
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            return data.userId;
        }catch(e){
            console.log(e.message);
        }
    },

    getUrlGoogle : async() => {
        try{
            const response = await fetch("http://localhost:25565/api/authorize/google/get-url");
            const data = await response.json();
            set({ googleUrl: data.url });
        }catch(e){
            console.log(e.message);
        }
    },

    getUserInfo : async() => {
        try{
            const response = await fetch("http://localhost:25565/api/user/get-short", {
                credentials: "include"
              });
            const data = await response.json();
            set({ userInfo: data });
            if(response.ok){
                set({ isAuth: true })
            }
        }catch(e){
            console.log(e.message);
        }
    }
}))