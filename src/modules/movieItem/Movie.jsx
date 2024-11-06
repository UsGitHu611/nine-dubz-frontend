import {Link} from "react-router-dom";
import {Preview} from "@modules/movieItem/components/preview/Preview.jsx";
import {OtherInfoMovie} from "@components/otherInfoMovie/OtherInfoMovie.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {MovieInfo} from "@modules/movieItem/components/movieInfo/MovieInfo.jsx";


export const Movie = ({ movie }) => {

    return (
        <Link className='overflow-hidden flex flex-col gap-3' to={`/movie/${movie.code}`}>
            <Preview
                webpPreview={movie?.previewWebp}
                webpDefaultPreview={movie?.defaultPreviewWebp}
                preview={movie?.preview}
                defaultPreview={movie?.defaultPreview}/>
            <div className='flex gap-3'>
                <PictureOrSavingLetter/>
                <div className='overflow-hidden'>
                    <MovieInfo movieName={movie.name} userName={movie.user.name}/>
                    <OtherInfoMovie
                        views={movie.views}
                        createdAt={movie.createdAt}/>
                </div>
            </div>
        </Link>

    )
}