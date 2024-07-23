import {Avatar, Card} from "antd";
import {Link} from "react-router-dom";
import {Preview} from "@modules/movieItem/components/preview/Preview.jsx";


export const Movie = ({movie}) => {

    return (

        <Link to={`/movie/${movie.code}`}>
            <Card
                styles={{ cover: { borderRadius: "9px" }}}
                className='bg-transparent border-transparent'
                size='small'
                cover={<Preview preview={movie.preview} defaultPreview={movie.defaultPreview}/>}>
                <Card.Meta
                    avatar={<Avatar
                    size='large'
                    src='https://sun136-1.userapi.com/impg/aOxCr-t_kABfgOHNlcXL-4Siw_L_PJ3viOG8Yw/Tz2MeakaZ6Y.jpg?size=1082x1080&quality=95&sign=185483c6bd1fc2874df61eb8fb63af73&type=album'/>}
                    title={<h2 className='text-gray-200 text-lg'>{movie.name}</h2>}
                    description={<p className='text-gray-200'>Роман Миллер</p>}
                />
            </Card>
        </Link>

    )
}