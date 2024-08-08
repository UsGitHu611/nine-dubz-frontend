import {
    MediaPlayer,
    MediaProvider,
    Poster,
} from '@vidstack/react';
import { VideoLayout } from './components/layout/VideoLayout.jsx';
import '@vidstack/react/player/styles/base.css';
import {useRef} from 'react';

export const PlayerVideo = ({ code, vtt, preview, defaultPreview, video360, video480, video720, videoShakal, video }) => {
    const player = useRef(null);
    const suckQuality = [video360, video480, video720, videoShakal];

    return (
        <MediaPlayer
            className='w-full aspect-video bg-slate-950 text-white
            font-sans overflow-hidden rounded-md ring-media-focus
            data-[focus]:ring-4'
            title="Sprite Fight"
            crossOrigin
            playsInline
            ref={player}
            src={[
                {
                    src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${code}`,
                    type: `video/webm`,
                    width: video?.width,
                    height: video?.height,
                },
                ...suckQuality.reduce((previousValue, currentValue) => {
                    return currentValue
                        ? [
                            ...previousValue,
                            {
                                src: `${import.meta.env.VITE_DEV_URL}/api/movie/stream/${code}?q=${currentValue.height}`,
                                type: `video/webm`,
                                width: currentValue.width,
                                height: currentValue.height
                            }
                        ]
                        : previousValue
                },[])
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