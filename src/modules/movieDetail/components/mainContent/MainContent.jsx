import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";
import {Await, useLoaderData} from "react-router-dom";
import {lazy, Suspense} from "react";
import {InteractivePanel} from "@modules/movieDetail/components/interactivePanel/InteractivePanel.jsx";

const CommentList = lazy(()=> import('@modules/movieDetail/components/commentList/CommentList.jsx'))

export const MainContent = () => {
    const { response } = useLoaderData();

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response}>
                { ({defaultPreview, preview, code, webVtt, name, createdAt, description, video360, video480, video720, videoShakal, video, user}) => (
                    <div className='flex flex-col gap-5'>
                        <PlayerVideo
                            defaultPreview={defaultPreview}
                            preview={preview}
                            code={code}
                            video={video}
                            video360={video360}
                            video480={video480}
                            video720={video720}
                            videoShakal={videoShakal}
                            vtt={webVtt?.name}/>
                        <h2 className='text-gray-200 text-4xl'>{name}</h2>
                        <InteractivePanel user={user}/>
                        <Description
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