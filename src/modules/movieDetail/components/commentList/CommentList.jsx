import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItem} from "@modules/movieDetail/components/commentItem/CommentItem.jsx";
import {useInfiniteList} from "@/hook/useInfiniteList.js";

const CommentList = ({code}) => {
    const getCommentsReq = movieDetailStore(state => state.getComments);
    const commentList = movieDetailStore(state => state.commentList);
    const {
        lastElemObserver,
        resultCommentList,
        isPending,
        isFetchingNextPage,
    } = useInfiniteList(getCommentsReq, code);

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
                {isPending ? <h1>Loading</h1> : resultCommentList.pages.map((page) => (
                    page.comments?.map((commentItem) => (
                        <CommentItem key={commentItem.id} {...{code, commentItem}}/>
                ))))}
            </ul>
            <span ref={lastElemObserver}></span>
        </>
    )
}

export default CommentList;