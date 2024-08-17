import {Await, useLoaderData} from "react-router-dom";
import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {Author} from "@modules/movieDetail/components/author/Author.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {lazy, Suspense} from "react";

const CommentList = lazy(()=> import('@modules/movieDetail/components/commentList/CommentList.jsx'));

export const MovieDetail = () => {
    const { response } = useLoaderData();

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response} errorElement={<h2 className='text-red-600 text-4xl'>Errr</h2>}>
                { ({defaultPreview, preview, views, code, webVtt, name, createdAt, description, videos, user}) => (
                    <div className='max-w-[1200px] p-3 rounded-[20px] mx-auto flex flex-col gap-5'>
                        <PlayerVideo
                            code={code}
                            videos={videos}
                            preview={preview}
                            vtt={webVtt?.name}
                            defaultPreview={defaultPreview}
                        />
                        <h2 className='text-gray-200 text-4xl md-mobile:text-2xl'>{name}</h2>
                        <Author name={user.name} picture={user.picture}/>
                        <Description
                            views={views}
                            createdAt={createdAt}
                            description={description}/>
                        <CommentForm code={code}/>
                        <CommentList code={code}/>
                    </div>
                )
                }
            </Await>
        </Suspense>

    )
}
