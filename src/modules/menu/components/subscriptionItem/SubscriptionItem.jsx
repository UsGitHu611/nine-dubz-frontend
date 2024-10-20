import {Avatar} from "antd";
import {Link} from "react-router-dom";

export const SubscriptionItem = ({picture, name, channelId}) => {

    return (
        <li>
            <Link
                className='flex gap-2 items-center p-1 hover:text-inherit hover:bg-white/10 rounded-lg'
                to={`/channel/${channelId}`}>
                <Avatar src={`${import.meta.env.VITE_DEV_URL}/api/file/${picture}`}/>
                <p>{ name }</p>
            </Link>
        </li>
    )
}