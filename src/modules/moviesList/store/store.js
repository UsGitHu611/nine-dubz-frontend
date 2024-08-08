import {create} from 'zustand'

export const storeMovies = create(() => ({
    getMovies : async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DEV_URL}/api/movie/`);
            return await response.json();
        }catch (e) {
            console.log(e.message)
        }
    }
}))