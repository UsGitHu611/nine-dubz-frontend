import {
    MediaPlayer,
    MediaProvider,
    Poster,
    useMediaStore
} from '@vidstack/react';
import { VideoLayout } from './components/layout/VideoLayout.jsx';
import '@vidstack/react/player/styles/base.css';
import {useRef} from 'react';

export const PlayerVideo = ({ videoUrl, vtt, preview, defaultPreview }) => {
    const player = useRef(null);
    const { qualities, quality, autoQuality, canSetQuality } = useMediaStore(player);

    return (
        <MediaPlayer
            className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
            title="Sprite Fight"
            crossOrigin
            playsInline
            ref={player}
            src={[
                {
                    id: 1,
                    src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${videoUrl}`,
                    type: `video/webm`,
                    width: 1920,
                    height: 1080,
                },
                // {
                //     id: 2,
                //     src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${videoUrl}?q=720`,
                //     type: `video/webm`,
                //     width: 1280,
                //     height: 720,
                // },
                // {
                //     id: 3,
                //     src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${videoUrl}?q=480`,
                //     type: `video/webm`,
                //     width: 853,
                //     height: 480,
                // },
                // {
                //     id: 4,
                //     src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${videoUrl}?q=360`,
                //     type: `video/webm`,
                //
                // },
                {
                    id: 5,
                    src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${videoUrl}?q=0`,
                    type: `video/webm`,
                    width: 320,
                    height: 240
                }
            ]}
        >

            <MediaProvider>
                <Poster
                    className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                    src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                    alt="joker"
                />
            </MediaProvider>


            <VideoLayout thumbnails={`${import.meta.env.VITE_DEV_URL}/api/file/${vtt}`} />
        </MediaPlayer>
    )
}