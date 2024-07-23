import {
    isHLSProvider,
    MediaPlayer,
    MediaProvider,
    Poster,
} from '@vidstack/react';
import { PauseIcon, PlayIcon } from '@vidstack/react/icons';
import { VideoLayout } from './components/layout/VideoLayout.jsx';
import '@vidstack/react/player/styles/base.css';
import { useRef } from 'react';

export const PlayerVideo = ({ videoUrl, vtt, preview, defaultPreview }) => {
    let player = useRef(null);

    function onProviderChange(provider) {
        if (isHLSProvider(provider)) {
            provider.config = {};
        }
    }

    function onCanPlay(detail, nativeEvent) {
        // ...
    }

    return (
        <MediaPlayer
            className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
            title="Sprite Fight"
            src={`http://localhost:25565/api/movie/stream/${videoUrl}`}
            crossOrigin
            playsInline
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}
            ref={player}
        >

            <MediaProvider>
                <Poster
                    className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                    src={`http://localhost:25565/api/file/${preview?.name || defaultPreview?.name}`}
                    alt="joker"
                />
            </MediaProvider>

            <VideoLayout thumbnails={`http://localhost:25565/api/file/${vtt}`} />
        </MediaPlayer>
    )
}