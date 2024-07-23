import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {InteractivePanel} from "@modules/movieDetail/components/interactivePanel/InteractivePanel.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";

export const MainContent = ({ result }) => {

    const {
        name,
        code,
        webVtt,
        description,
        createdAt,
        preview,
        defaultPreview } = result;

    return (
        <div className='flex flex-col gap-5'>
            <PlayerVideo
                defaultPreview={defaultPreview}
                preview={preview}
                videoUrl={code}
                vtt={webVtt.name}/>
            <h2 className='text-gray-200 text-4xl'>
                { name }
            </h2>
            <InteractivePanel/>
            <Description
                createdAt={createdAt || "2024-07-22T00:30:00.912+03:00"}
                description={description}/>
            <CommentForm/>
        </div>
    )
}