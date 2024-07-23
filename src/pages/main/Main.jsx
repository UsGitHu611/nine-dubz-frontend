import { Container } from "@components/container/Container.jsx";
import { MoviesList } from "@modules/moviesList/MoviesList.jsx";
import { useShowSuccessReg } from "@modules/registrationForm/hook/useShowSuccessReg";
import { Helmet } from 'react-helmet-async';

export const Main =() => {
    const contextHolder= useShowSuccessReg();

    return (
        <>
            { contextHolder }
            <section>
                <h1 className='hidden'>NineDubzNineDubzNineDubz</h1>
                <Helmet>
                    <title>Home</title>
                    <meta name="description" content="Главная страница"/>
                    <meta property="og:site_name" content="NineDubz"/>
                    <meta property="og:locale" content="ru_RU"/>
                    <meta property="og:type" content="video.movie"/>
                </Helmet>
                <Container>
                    <MoviesList/>
                </Container>
            </section>
        </>
    )
}