import { storeMovies } from "@modules/moviesList/store/store.js";
import {useQuery} from "@tanstack/react-query";

export const useGetMovies = () => {
    const getMoviesList = storeMovies(state => state.getMovies);
    const {data : movies, isError, isLoading, isSuccess} = useQuery({
        queryKey: ['getMovieList'],
        queryFn: getMoviesList
    })
    return {
        movies, isError, isLoading, isSuccess
    }
}