import {create} from "zustand";
import {cookie} from "@/helper/cookie.js";

export const studioStore = create((set, get) => ({
    fileData: {
        movieCode: "",
        token: "",
        filename: "",
        size : 0
    },
    movieData: {
        name: "",
        description: "",
        preview : {}
    },
    allMovies: [],
    filePos: 0,
    step: 0,
    file: {},
    isConnected: false,
    isLoadFile: false,
    showModal : false,

    setCurrentStep: (curr) => set({step: curr}),
    setIsLoadFile: (bool) => set({isLoadFile: bool}),
    setShowModal : (bool) => set({ showModal : bool }),
    setIsConnected: (bool) => set({ isConnected: bool }),
    setAllMovies: (movies) => set({ allMovies: [ ...movies ] }),
    setFilePos: (pos) => set(prev =>({ filePos: prev.filePos + pos })),
    setMovieData : (data) => set((state) => {
        const { file } = data.file;
        return {
            movieData : {
                ...state.movieData,
                name: data.name,
                description: data.description,
                preview : file
            }
        }
    }),

    createMovie : async (action) => {
        try {
            const file = action.file;
            const response = await fetch("http://localhost:25565/api/movie/user",{
                method: "POST",
                credentials: "include",
                withCredentials: true
            });
            const code = await response.json();
            if(response.ok){
                set({
                    fileData : {
                        fileName: file.name,
                        size: file.size,
                        movieCode: code.code,
                        token: cookie.findKey('token')
                    }
                })
                set({ isConnected : true });
                set({ file: file });
                set(prev => ({step: prev.step + 1}))
            }
            return code
        }catch(e){
            console.log(e.message)
        }
    },

    createMovieInfo : async (formData) => {
        try {
            const response = await fetch(`http://localhost:25565/api/movie/user/${get().fileData.movieCode}`, {
                method: "POST",
                credentials: "include",
                body: formData
            });
            const resultSuccess = await response.json();
            return resultSuccess;
        }catch (e) {
            console.log(e.message)
        }
    },

    getMoviesStudio: async () => {
        try {
            const response = await fetch('http://localhost:25565/api/movie/user',{
                credentials: "include"
            })
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    updateMovieStatus: async (option) => {
        try {
            const response = await fetch('http://localhost:25565/api/movie/user/multiple/status',{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    isPublished: option.value,
                    code: option.code
                })
            })
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    deleteMovieStudio: async (code) => {
        try {
            const response = await fetch(`http://localhost:25565/api/movie/user/${code}`,{
                method: "DELETE",
                credentials: "include"
            })
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    },

    deleteAllMovieStudio: async (movies) => {
        try {
            const response = await fetch('http://localhost:25565/api/movie/user/multiple',{
                method: "DELETE",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movies)
            })
            // return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    }
}))