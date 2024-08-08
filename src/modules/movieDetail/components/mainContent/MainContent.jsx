import {lazy, Suspense} from "react";
import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";
import {Await, useLoaderData} from "react-router-dom";
import {InteractivePanel} from "@modules/movieDetail/components/interactivePanel/InteractivePanel.jsx";

const CommentList = lazy(()=> import('@modules/movieDetail/components/commentList/CommentList.jsx'))

export const MainContent = () => {
    const { response } = useLoaderData();

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response}>
                { ({defaultPreview, preview, views, code, webVtt, name, createdAt, description, video360, video480, video720, videoShakal, video, user}) => (
                    <div className='flex flex-col gap-5'>
                        <PlayerVideo
                            code={code}
                            video={video}
                            preview={preview}
                            vtt={webVtt?.name}
                            video360={video360}
                            video480={video480}
                            video720={video720}
                            videoShakal={videoShakal}
                            defaultPreview={defaultPreview}
                            />
                        <h2 className='text-gray-200 text-4xl'>{name}</h2>
                        <InteractivePanel user={user}/>
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