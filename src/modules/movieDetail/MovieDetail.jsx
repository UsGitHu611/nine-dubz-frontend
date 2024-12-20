import {Await, useLoaderData} from "react-router-dom";
import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {Author} from "@modules/movieDetail/components/author/Author.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {lazy, Suspense} from "react";
import {NotFound} from "@pages/notFound/NotFound.jsx";
import {MoveTitle} from "@modules/movieDetail/components/moveTitle/MoveTitle.jsx";

const CommentList = lazy(()=> import('@modules/movieDetail/components/commentList/CommentList.jsx'));

export const MovieDetail = () => {
    const { response } = useLoaderData();
    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await
                resolve={response}
                errorElement={<NotFound/>}>
                { ({defaultPreview, preview, views, code, webVtt, name, createdAt, description, videos, user}) => {
                    return (
                        <div className='p-3 pb-5 md-mobile:p-0'>
                            <PlayerVideo
                                code={code}
                                videos={videos}
                                preview={preview}
                                vtt={webVtt?.name}
                                defaultPreview={defaultPreview}
                            />
                            <div className='md-mobile:p-3 flex flex-col gap-4'>
                                <MoveTitle name={name}/>
                                <Author
                                    userId={user.id}
                                    name={user.name}
                                    picture={user?.picture}/>
                                <Description
                                    views={views}
                                    createdAt={createdAt}
                                    description={description}/>
                                <CommentForm code={code}/>
                                <CommentList code={code}/>
                            </div>
                        </div>
                    )
                }
                }
            </Await>
        </Suspense>

    )
}
