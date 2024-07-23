import {Col, Row} from "antd";
import {Movie} from "@modules/movieItem/Movie.jsx";
import {memo} from "react";
import {useGetMovies} from "@modules/moviesList/hook/useGetMovies.js";
import {PacmanLoader} from "react-spinners";

export const MoviesList = memo(() => {
    const {movies, isError, isLoading} = useGetMovies();

    return (
        <div>
            { !movies?.length && <h2 className='text-gray-200'>Список пуст</h2> }
            { isError && <h1 className='text-[red]'>Error</h1> }
            { isLoading
                ? <PacmanLoader color='white'/>
                : <Row className='mt-[50px]' gutter={[19,19]}>
                    { movies.map((movie) => (
                        <Col key={movie.code} span={6}>
                            <Movie movie={movie}/>
                        </Col>
                    )) }
                </Row>
            }
        </div>
    )
})