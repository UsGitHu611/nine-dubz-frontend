import {Movie} from "@modules/movieItem/Movie.jsx";
import {useGetMovies} from "@modules/moviesList/hook/useGetMovies.js";
import SkeletonList from "@modules/moviesList/component/SkeletonList.jsx";

export const MoviesList = () => {
    const { movies, isError, isLoading } = useGetMovies();

    return (
        <>
            { isError && <h1 className='text-[red]'>Error</h1> }
            { isLoading
                ? <SkeletonList />
                : <ul className='grid grid-cols-4 gap-2 my-[20px]
                    lg-mobile:grid-cols-2 md-mobile:grid-cols-1 laptop:grid-cols-3'>
                    { movies?.map((movie) => (
                        <li key={movie.code} className='p-3 rounded-[8px]
                         hover:bg-[#262c33] transition lg-mobile:px-3 w-full focus:bg-[#262c33]'>
                            <Movie movie={movie}/>
                        </li>
                    )) }
                </ul>
            }
        </>
    )
}