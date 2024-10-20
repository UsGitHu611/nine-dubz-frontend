import {List, Button} from "antd";
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
        subCommentsCount : staticSubCommentCount,
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
                className='my-2 p-3 rounded-[13px] md-mobile:hidden'
                onClick={() => setShowReplyList(prevState => !prevState)}>
                Показать ответы ({staticSubCommentCount || subCommentList?.length})
            </Button>
            { showReplyList && (
                <List
                    loading={isLoading}
                    dataSource={subCommentList?.map(({user, text, createdAt, id, parentId}) => ({
                        parentId,
                        commentId: id,
                        title: user?.name,
                        userId : user.id,
                        description: text,
                        userPicture: user.picture?.name,
                        createdAt : timeCreated(createdAt),
                    }))}
                    renderItem={({title, description, createdAt, parentId, userPicture, commentId, userId}) => (
                        <CommentItemReply
                            code={code}
                            title={title}
                            userId={userId}
                            userPicture={userPicture}
                            commentId={commentId}
                            parentId={parentId}
                            createdAt={createdAt}
                            description={description}/>
                    )}
                />
            ) }
            {
                (showReplyList && staticSubCommentCount > 10) && (dynamicSubCommentCount - (subCommentList?.length || 0)) &&
                <Button className='my-2 p-3 rounded-[13px]' onClick={refetchReq}>
                    Показать больше
                </Button>
            }
        </>
    )
}