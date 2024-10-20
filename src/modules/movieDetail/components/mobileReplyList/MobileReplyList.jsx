import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {MobileOwnerComment} from "@modules/movieDetail/components/mobileOwnerComment/MobileOwnerComment.jsx";
import {MobileCommentItem} from "@modules/movieDetail/components/mobileCommentItem/MobileCommentItem.jsx";

export const MobileReplyList = ({ parentId, isOpenMobileMenu }) => {
    const commentListContext = useContext(MobileCommentContext);
    const getReplyReq = movieDetailStore(state => state.getReply);
    const subCommentList = movieDetailStore(state => state.subCommentList)[parentId];


    useQuery({
        queryKey: ['getReply', parentId],
        queryFn: () => getReplyReq({
            code : commentListContext.code,
            commentId : parentId,
            offset : 0
        }),
        enabled: !!isOpenMobileMenu,
        refetchOnWindowFocus : false
    });

    return (
        <ul className='flex flex-col pb-4 h-[calc(100%_-_115px)] overflow-y-scroll
            scroll-smooth overflow-x-hidden'>
            <MobileOwnerComment parentId={parentId}/>

            { subCommentList?.map(({ user, text, createdAt, id }) => (
                <MobileCommentItem
                    userPicture={user.picture?.name}
                    description={text}
                    title={user.name}
                    commentId={id}
                    subCommentsCount={0}
                    userId={user.id}
                    createdAt={createdAt}
                    key={id}/>
            ))}
        </ul>
    )
}