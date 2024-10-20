import {useContext} from "react";
import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";
import {MobileCommentItem} from "@modules/movieDetail/components/mobileCommentItem/MobileCommentItem.jsx";


const MobileCommentList = () => {
    const commentListContext = useContext(MobileCommentContext);

    return (
        <ul className='flex flex-col py-2 gap-1 h-[calc(100%_-_115px)] overflow-y-scroll scroll-smooth overflow-x-hidden'>
            { commentListContext.commentListSource.map((commentProps) => (
                <MobileCommentItem key={commentProps.commentId} {...commentProps}/>
            )) }
        </ul>
    )
}

export default MobileCommentList