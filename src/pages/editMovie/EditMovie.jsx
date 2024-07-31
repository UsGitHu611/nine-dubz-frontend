import {EditMovieDetail} from "@modules/editMovie/EditMovieDetail.jsx";
import {ButtonBackward} from "@components/buttonBackward/ButtonBackward.jsx";

export const EditMovie = () => {

    return (
        <section className='bg-container min-h-[calc(100vh_-_170px)] flex justify-center relative'>
            <ButtonBackward/>
            <EditMovieDetail/>
        </section>
    )
}