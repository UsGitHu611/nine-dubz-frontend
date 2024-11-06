import {Button} from "antd";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItemReply} from "@modules/movieDetail/components/commentItemReply/CommentItemReply.jsx";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";

export const ReplyList = (
    {
        code,
        refetch,
        parentId,
        isLoading,
        setOffset,
        showReplyList,
        setShowReplyList,
        subCommentsCount: staticSubCommentCount,
    }
) => {
    const subCommentList = movieDetailStore(state => state.subCommentList)[parentId];
    const dynamicSubCommentCount = movieDetailStore(state => state.commentList)['a' + parentId].subCommentsCount;

    const refetchReq = async () => {
        await setOffset(prev => prev + 10);
        refetch();
    }

    return (
        <>
            <Button
                className='my-2 p-3 rounded-[13px] md-mobile:hidden mr-auto'
                onClick={() => setShowReplyList(prevState => !prevState)}>
                {!showReplyList ? 'Показать' : 'Скрыть'} ответы ({staticSubCommentCount || subCommentList?.length})
            </Button>
            {showReplyList && (
                <ul className='flex flex-col gap-1 divide-y divide-gray-200/10'>
                    {subCommentList?.map(({user, text, createdAt, id, parentId}) => (
                        <CommentItemReply
                            key={id}
                            code={code}
                            title={user?.name}
                            userId={user.id}
                            userPicture={user.picture?.name}
                            commentId={id}
                            parentId={parentId}
                            createdAt={timeCreated(createdAt)}
                            description={text}/>
                    ))}
                </ul>
            )}
            {
                (dynamicSubCommentCount > 10) &&
                <Button className='my-2 p-3 rounded-[13px]' onClick={refetchReq}>
                    Показать больше
                </Button>
            }
        </>
    )
}