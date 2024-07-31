import {PlayerVideo} from "@modules/player/PlayerVideo.jsx";
import {CommentForm} from "@modules/movieDetail/components/commentForm/CommentForm.jsx";
import {InteractivePanel} from "@modules/movieDetail/components/interactivePanel/InteractivePanel.jsx";
import {Description} from "@modules/movieDetail/components/description/Description.jsx";
import {CommentList} from "@modules/movieDetail/components/commentList/CommentList.jsx";

export const MainContent = ({ result }) => {
    const {
        name,
        code,
        webVtt,
        description,
        createdAt,
        preview,
        defaultPreview } = result;

// /api/comment/{movieCode}/{commentId} -
// - GET - получить дальнейшие ответы на конкретнй ответ через пагинацию, в ответ придет один объект коммента и так же будут вложены чайлды, как сверху писал

    return (
        <div className='flex flex-col gap-5'>
            <PlayerVideo
                defaultPreview={defaultPreview}
                preview={preview}
                videoUrl={code}
                vtt={webVtt?.name}/>
            <h2 className='text-gray-200 text-4xl'>
                { name }
            </h2>
            <InteractivePanel/>
            <Description
                createdAt={createdAt}
                description={description}/>
            <CommentForm code={code}/>
            <CommentList code={code}/>
        </div>
    )
}