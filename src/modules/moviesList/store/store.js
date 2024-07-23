import { create } from 'zustand'

export const storeMovies = create((set) => ({

    getMovies : async () => {
        try {
            const response = await fetch("http://localhost:25565/api/movie/");
            const data = await response.json();
            return data;
        }catch (e) {
            console.log(e.message)
        }
    }
}))