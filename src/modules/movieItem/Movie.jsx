import {Avatar, Card} from "antd";
import {Link} from "react-router-dom";
import {Preview} from "@modules/movieItem/components/preview/Preview.jsx";
import {OtherInfoMovie} from "@components/otherInfoMovie/OtherInfoMovie.jsx";


export const Movie = ({ movie }) => {

    return (
        <Link to={`/movie/${movie.code}`}>
            <Card
                styles={{ cover: { borderRadius: "9px", overflow: "hidden" }}}
                className='bg-transparent border-transparent'
                cover={
                <Preview
                    webpPreview={movie?.previewWebp}
                    webpDefaultPreview={movie?.defaultPreviewWebp}
                    preview={movie?.preview}
                    defaultPreview={movie?.defaultPreview}/>
            }>
                <Card.Meta
                    avatar={
                    <Avatar size='large' src={`${import.meta.env.VITE_DEV_URL}/api/file/${movie.user.picture?.name}`}/>
                }
                    title={
                        <h2 title={movie.name} className='text-gray-200 text-balance line-clamp-2'>{movie.name}</h2>
                    }
                    description={
                        <>
                            <p className='text-gray-200'>{movie.user.name}</p>
                            <OtherInfoMovie
                                views={movie.views}
                                createdAt={movie.createdAt}/>
                        </>
                    }
                />
            </Card>
        </Link>

    )
}