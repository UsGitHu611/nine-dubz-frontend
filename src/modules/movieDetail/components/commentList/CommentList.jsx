import {useQuery} from "@tanstack/react-query";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItem} from "@modules/movieDetail/components/commentItem/CommentItem.jsx";
import {MobileBottomContent} from "@modules/movieDetail/components/mobileBottomContent/MobileBottomContent.jsx";
import {MobileCommentProvider} from "@modules/movieDetail/context/MobileCommentProvider.jsx";

const CommentList = ({code}) => {
    const getCommentsReq = movieDetailStore(state => state.getComments);
    const commentList = movieDetailStore(state => state.commentList);

    const {isLoading} = useQuery({
        queryKey: ['getComments'],
        queryFn: async () => getCommentsReq({code, offset: 0}),
        enabled: !!code,
        refetchOnWindowFocus: false
    });

    const commentListSource = Object.entries(commentList).reduce((prevV, currV) => {
        return currV[0] === 'commentsCount' ? prevV : [
            ...prevV,
            {
                userId: currV[1].user?.id,
                commentId: currV[1].id,
                subCommentsCount: currV[1].subCommentsCount,
                title: currV[1].user?.name,
                userPicture: currV[1]?.user.picture?.name,
                description: currV[1].text,
                createdAt: timeCreated(currV[1].createdAt)
            }
        ]
    }, []);

    return (
        <>
            {/*<MobileCommentProvider value={{commentListSource, code}}>*/}
            {/*    <MobileBottomContent/>*/}
            {/*</MobileCommentProvider>*/}

            <ul className="flex flex-col gap-3 md-mobile:hidden before:hidden before:content-[attr(data-message)]
            before:text-gray-200/50 before:mx-auto empty:before:block"
            data-message='Будьте первым кто оставит комментарий!'>
                {isLoading ? <h1>Loading</h1> : commentListSource.map((commentItem) => (
                    <CommentItem key={commentItem.commentId} {...{code, commentItem}}/>
                ))}
            </ul>

        </>
    )
}

export default CommentList;