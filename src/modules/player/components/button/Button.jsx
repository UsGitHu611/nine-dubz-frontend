import {
    FullscreenButton,
    MuteButton,
    PIPButton,
    PlayButton,
    Tooltip,
    useMediaState,
} from '@vidstack/react';

import {
    FullscreenExitIcon,
    FullscreenIcon,
    MuteIcon,
    PauseIcon,
    PictureInPictureExitIcon,
    PictureInPictureIcon,
    PlayIcon,
    VolumeHighIcon,
    VolumeLowIcon,
} from '@vidstack/react/icons';
import {CompressOutlined, ExpandOutlined} from "@ant-design/icons";


export const buttonClass =
    '' +
    'relative inline-flex w-10 aspect-square cursor-pointer items-center md-mobile:w-full' +
    'justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4' +
    '';

export const tooltipClass =
    'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden';

export function Play({ tooltipPlacement }) {
    const isPaused = useMediaState('paused');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <PlayButton className={buttonClass}>
                    { isPaused
                        ? <PlayIcon className="w-full aspect-square" />
                        : <PauseIcon className="w-full aspect-square" />
                    }
                </PlayButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isPaused ? 'Play' : 'Pause'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function Mute({ tooltipPlacement }) {
    const volume = useMediaState('volume');
    const isMuted = useMediaState('muted');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <MuteButton className={`${buttonClass} md-mobile:hidden`}>
                    {isMuted || volume === 0 ? (
                        <MuteIcon className="w-8 h-8" />
                    ) : volume < 0.5 ? (
                        <VolumeLowIcon className="w-8 h-8" />
                    ) : (
                        <VolumeHighIcon className="w-8 h-8" />
                    )}
                </MuteButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isMuted ? 'Unmute' : 'Mute'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function PIP({ tooltipPlacement }) {
    const isActive = useMediaState('pictureInPicture');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <PIPButton className={`${buttonClass} md-mobile:hidden`}>
                    {isActive ? (
                        <PictureInPictureExitIcon className="w-8 h-8" />
                    ) : (
                        <PictureInPictureIcon className="w-8 h-8" />
                    )}
                </PIPButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isActive ? 'Exit PIP' : 'Enter PIP'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function Fullscreen({ tooltipPlacement }) {
    const isActive = useMediaState('fullscreen');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <FullscreenButton className={buttonClass + " justify-end"}>
                    {isActive ? (
                        <CompressOutlined className="w-8 h-8 justify-center" />
                    ) : (
                        <ExpandOutlined className="w-8 h-8 justify-center" />
                    )}
                </FullscreenButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}