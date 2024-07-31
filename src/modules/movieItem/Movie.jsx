import {Avatar, Card} from "antd";
import {Link} from "react-router-dom";
import {Preview} from "@modules/movieItem/components/preview/Preview.jsx";


export const Movie = ({movie}) => {
    //38 44 51
    // border-rad 8px
    return (

        <Link to={`/movie/${movie.code}`}>
            <Card
                styles={{ cover: { borderRadius: "9px" }}}
                className='bg-transparent border-transparent'
                size='small'
                cover={<Preview preview={movie?.preview} defaultPreview={movie?.defaultPreview}/>}>
                <Card.Meta
                    avatar={<Avatar
                    size='large'
                    src={`${import.meta.env.VITE_DEV_URL}/api/file/${movie.user.picture?.name}`}/>}
                    title={<h2 className='text-gray-200 text-lg'>{movie.name}</h2>}
                    description={<p className='text-gray-200'>{movie.user.name}</p>}
                />
            </Card>
        </Link>

    )
}