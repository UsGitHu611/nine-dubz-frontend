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
            className='aspect-video bg-slate-950
            text-white font-sans rounded-md md-mobile:rounded-none ring-media-focus data-[focus]:ring-4
            relative overflow-hidden w-full'
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
                    className="absolute inset-0 block w-full aspect-video rounded-md object-cover opacity-0 transition-opacity data-[visible]:opacity-100"
                    src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                    alt="joker"
                />
            </MediaProvider>

            <VideoLayout thumbnails={`${import.meta.env.VITE_DEV_URL}/api/file/${vtt}`} />
        </MediaPlayer>
    )
}