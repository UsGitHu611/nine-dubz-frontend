import {Col, Row} from "antd";
import {Movie} from "@modules/movieItem/Movie.jsx";
import {useGetMovies} from "@modules/moviesList/hook/useGetMovies.js";
import {PacmanLoader} from "react-spinners";

export const MoviesList = () => {
    const {movies, isError, isLoading} = useGetMovies();

    return (
        <div>
            { !movies?.length && <h2 className='text-gray-200'>Список пуст</h2> }
            { isError && <h1 className='text-[red]'>Error</h1> }
            { isLoading
                ? <PacmanLoader color='white'/>
                : <Row className='my-[50px]' gutter={[25,20]} >
                    { movies.map((movie) => (
                        <Col className='p-2 rounded-[8px] hover:scale-105 hover:bg-[#262c33] transition' key={movie.code} span={6}>
                            <Movie movie={movie}/>
                        </Col>
                    )) }
                </Row>
            }
        </div>
    )
}