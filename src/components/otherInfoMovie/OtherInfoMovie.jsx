import {timeCreated} from "@/helper/timeCreated.js";

export const OtherInfoMovie = ({ views, createdAt }) => {
    return (
        <div className='flex items-center gap-2'>
            <span className='text-gray-200'>{views} просмотров</span>
            <small className='text-gray-200/50'>{
                timeCreated(createdAt)
            }</small>
        </div>
    )
}