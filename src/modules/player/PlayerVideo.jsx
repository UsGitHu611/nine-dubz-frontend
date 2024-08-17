import {
    MediaPlayer,
    MediaProvider,
    Poster,
} from '@vidstack/react';
import { VideoLayout } from './components/layout/VideoLayout.jsx';
import '@vidstack/react/player/styles/base.css';
import {useRef} from 'react';
import {BufferingIndicator} from "@modules/player/components/BufferingIndicator/BufferingIndicator.jsx";

export const PlayerVideo = ({ code, vtt, preview, defaultPreview, videos }) => {
    const player = useRef(null);

    const suckQuality = videos.reduce((previousValue, currentValue) => {
        return currentValue
            ? [
                ...previousValue,
                {
                    src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${code}?q=${currentValue.quality?.code}`,
                    type: `video/mp4`,
                    width: currentValue.width,
                    height: currentValue.height,
                    title : currentValue.quality?.title
                }
            ]
            : previousValue
    },[])

    return (
        <MediaPlayer
            className='w-full aspect-video md-mobile:aspect-square bg-slate-950
            text-white font-sans rounded-md ring-media-focus data-[focus]:ring-4
            relative overflow-hidden data-[buffering]:first:visible'
            title="Sprite Fight"
            crossOrigin
            playsInline
            volume={0.2}
            storage='media-options'
            ref={player}
            src={[...suckQuality ]}
        >
            <BufferingIndicator/>
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