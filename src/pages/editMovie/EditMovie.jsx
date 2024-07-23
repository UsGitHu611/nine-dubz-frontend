import {EditMovieDetail} from "@modules/editMovie/EditMovieDetail.jsx";
import {Container} from "@components/container/Container.jsx";

export const EditMovie = () => {
    return (
        <section className='bg-container'>
            <Container>
                <div className='max-w-[760px] mx-auto'>
                    <EditMovieDetail/>
                </div>
            </Container>
        </section>
    )
}