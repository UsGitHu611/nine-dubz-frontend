import { create } from 'zustand'

export const storeMovies = create((set) => ({

    getMovies : async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/movie/`);
            const data = await response.json();
            return data;
        }catch (e) {
            console.log(e.message)
        }
    }
}))