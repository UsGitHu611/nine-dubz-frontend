import {List, Button} from "antd";
import {timeCreated} from "@/helper/timeCreated.js";
import {useState} from "react";
import {CommentItemReply} from "@modules/movieDetail/components/commentItemReply/CommentItemReply.jsx";

export const ReplyList = ({ subComments, subCommentsCount, code, userId, commentId : parentCommentId }) => {
    const [showReplyList, setShowReplyList] = useState(false);

    return (
        <>
            <Button
                size='small'
                className='my-2 p-3 rounded-[13px]'
                onClick={() => setShowReplyList(prevState => !prevState)}>
                Показать ответы ({subCommentsCount})
            </Button>
            { showReplyList && (
                <List
                    dataSource={subComments?.map(({user, text, createdAt, id,}) => ({
                        commentId: id,
                        title: user?.name,
                        description: text,
                        userPicture: user.picture?.name,
                        createdAt : timeCreated(createdAt)
                    }))}
                    renderItem={({title, description, createdAt, commentId : subComment, userPicture}) => (
                        <CommentItemReply
                            code={code}
                            title={title}
                            userId={userId}
                            userPicture={userPicture}
                            parentCommentId={parentCommentId}
                            subComment={subComment}
                            createdAt={createdAt}
                            description={description}/>
                    )}
                />
            ) }
        </>
    )
}