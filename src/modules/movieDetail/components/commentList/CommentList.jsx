import {useQuery} from "@tanstack/react-query";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {List} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import {timeCreated} from "@/helper/timeCreated.js";
import {CommentItem} from "@modules/movieDetail/components/commentItem/CommentItem.jsx";
import {CommentProvider} from "@modules/movieDetail/context/CommentProvider.jsx";
import {MobileBottomContent} from "@modules/movieDetail/components/mobileBottomContent/MobileBottomContent.jsx";
import {MobileCommentProvider} from "@modules/movieDetail/context/MobileCommentProvider.jsx";

const CommentList = ({ code }) => {
    const getCommentsReq = movieDetailStore(state => state.getComments);
    const commentList = movieDetailStore(state => state.commentList);

    const { isLoading } = useQuery({
        queryKey: ['getComments'],
        queryFn: async () => getCommentsReq({code, offset : 0}),
        enabled: !!code,
        refetchOnWindowFocus : false
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
            { !commentListSource.length ? (
                <p className='text-gray-200/50 mx-auto text-lg items-center font-medium flex gap-2 md-mobile:text-xs sm-mobile:text-[10px]'>
                    Будьте первым кто оставит комментарий!
                    <CommentOutlined className='text-2xl'/>
                </p>
            ) : (
                <>
                    <MobileCommentProvider value={{commentListSource, code}}>
                        <MobileBottomContent/>
                    </MobileCommentProvider>

                    <List
                        className='md-mobile:hidden'
                        dataSource={commentListSource}
                        loading={isLoading}
                        renderItem={({title, description, createdAt, commentId, subCommentsCount, userId, userPicture}) => (
                            <CommentProvider commentValue={
                                { code, title, userId, commentId, userPicture, description, subCommentsCount, createdAt }
                            }>
                                <CommentItem/>
                            </CommentProvider>
                        ) }/>
                </>
                    )}
        </>
    )}

export default CommentList;