import {List, Button} from "antd";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItemReply} from "@modules/movieDetail/components/commentItemReply/CommentItemReply.jsx";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";


export const ReplyList = ({ subCommentsCount, code, showReplyList, setShowReplyList, isLoading, refetch, parentId }) => {
    const subCommentList = movieDetailStore(state => state.subCommentList)[parentId];

    return (
        <>
            <Button
                className='my-2 p-3 rounded-[13px]'
                onClick={() => setShowReplyList(prevState => !prevState)}>
                Показать ответы ({subCommentsCount})
            </Button>
            { showReplyList && (
                <List
                    loading={isLoading}
                    dataSource={subCommentList?.map(({user, text, createdAt, id, parentId}) => ({
                        commentId: id,
                        title: user?.name,
                        userId : user.id,
                        description: text,
                        userPicture: user.picture?.name,
                        createdAt : timeCreated(createdAt),
                        parentId
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
                showReplyList && subCommentsCount > 10 &&
                <Button className='my-2 p-3 rounded-[13px]' onClick={()=>{ refetch() }}>
                    Показать больше
                </Button>
            }
        </>
    )
}