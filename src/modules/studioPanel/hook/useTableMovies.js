import {useMutation, useQueryClient} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";

export const useTableMovies = () => {
    const updateMovieStatus = studioStore(state => state.updateMovieStatus);
    const deleteMovieStudio = studioStore(state => state.deleteMovieStudio);

    const studioMoviesInvalidate = useQueryClient();


    const { mutate : updateStatus } = useMutation({
        mutationKey: ['moviePublished'],
        mutationFn: (option) => updateMovieStatus(option),
        onSuccess: () => studioMoviesInvalidate.invalidateQueries({ queryKey: ['studioMovies'] })
    })

    const { mutate : deleteMovie } = useMutation({
        mutationKey: ['deleteMovieStudio'],
        mutationFn: (code) => deleteMovieStudio(code),
        onSuccess: () => studioMoviesInvalidate.invalidateQueries({ queryKey: ['studioMovies'] })
    });

    return { deleteMovie, updateStatus }
}