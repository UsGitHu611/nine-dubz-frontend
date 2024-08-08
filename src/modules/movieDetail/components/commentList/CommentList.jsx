import {useQuery} from "@tanstack/react-query";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {ConfigProvider, Empty, List} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItem} from "@modules/movieDetail/components/commentItem/CommentItem.jsx";

const CommentList = ({ code }) => {
    const getCommentsReq = movieDetailStore(state => state.getComments);
    const { data: commentList, isLoading } = useQuery({
        queryKey: ['getComments'],
        queryFn: () => getCommentsReq(code),
        enabled: !!code
    });

    return (
        <>
            { isLoading ? <h2>Loading</h2> : (
                <ConfigProvider
                    renderEmpty={() => (
                    <Empty
                        image={<CommentOutlined style={{ fontSize: "50px", color: "rgb(229 231 235 / 0.4)" }}/>}
                        imageStyle={{ height: "auto" }}
                        description={<p className='text-gray-200/40 max-w-[400px] mx-auto text-[17px]'>Будьте первым кто оставит комментарий!</p>}/>
                )}>
                    <List
                        dataSource={commentList?.comments?.map(({user, text, createdAt, id, subCommentsCount, subComments}) => ({
                            userId : user?.id,
                            subComments,
                            commentId : id,
                            subCommentsCount,
                            title: user?.name,
                            userPicture : user.picture?.name,
                            description: text,
                            createdAt : timeCreated(createdAt),
                        }))}
                        renderItem={({title, description, createdAt, commentId, subCommentsCount, subComments, userId, userPicture}) => (
                            <CommentItem
                                code={code}
                                title={title}
                                userId={userId}
                                commentId={commentId}
                                userPicture={userPicture}
                                subComments={subComments}
                                description={description}
                                subCommentsCount={subCommentsCount}
                                createdAt={createdAt}/>
                        )}/>
                </ConfigProvider>
            ) }
        </>
    )
}

export default CommentList