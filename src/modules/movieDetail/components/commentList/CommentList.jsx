import {useQuery} from "@tanstack/react-query";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {ConfigProvider, Empty, List, Skeleton} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItem} from "@modules/movieDetail/components/commentItem/CommentItem.jsx";

const CommentList = ({ code }) => {
    const getCommentsReq = movieDetailStore(state => state.getComments);
    const commentList = movieDetailStore(state => state.commentList);
    const skeletonArray = Array(4).fill(0);

    const { isLoading } = useQuery({
        queryKey: ['getComments'],
        queryFn: async () => getCommentsReq({code, offset : 0}),
        enabled: !!code
    });

    const commentListSource = Object.entries(commentList).reduce((prevV, currV) => {
        return currV[0] === 'commentsCount' ? prevV : [
            ...prevV,
            {
                userId : currV[1].user?.id,
                commentId : currV[1].id,
                subCommentsCount : currV[1].subCommentsCount,
                title: currV[1].user?.name,
                userPicture : currV[1]?.user.picture?.name,
                description: currV[1].text,
                createdAt : timeCreated(currV[1].createdAt)
            }
        ]
    }, []);

    return (
        <>
            { isLoading ? skeletonArray.map((_, index) => (
                <Skeleton key={index} loading={isLoading} active avatar/>
            )) : (
                <ConfigProvider
                    renderEmpty={() => (
                    <Empty
                        image={<CommentOutlined style={{ fontSize: "50px", color: "rgb(229 231 235 / 0.4)" }}/>}
                        imageStyle={{ height: "auto" }}
                        description={<p className='text-gray-200/40 max-w-[400px] mx-auto text-[17px]'>Будьте первым кто оставит комментарий!</p>}/>
                )}>
                    <List
                        dataSource={commentListSource}
                        loading={isLoading}
                        renderItem={({title, description, createdAt, commentId, subCommentsCount, userId, userPicture}) => (
                            <CommentItem
                                code={code}
                                title={title}
                                userId={userId}
                                commentId={commentId}
                                userPicture={userPicture}
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