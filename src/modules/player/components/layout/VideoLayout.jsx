import styles from '../../css/video-layout.module.css';
import { Controls, Gesture } from '@vidstack/react';
import * as Buttons from '../button/Button.jsx';
import * as Menus from '../menus/Menus.jsx';
import * as Sliders from '../sliders/Sliders.jsx';
import { TimeGroup } from '../timeGroup/TimeGroup.jsx';


export function VideoLayout({ thumbnails }) {
    return (
        <>
            <Gestures />
            <Controls.Root
                className={`${styles.controls} media-controls:opacity-100 absolute inset-0 flex h-full 
                w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity`}
            >
                <div className="flex-1" />
                <Controls.Group className="flex w-full items-center px-2 md-mobile:hidden">
                    <Sliders.Time thumbnails={thumbnails} />
                </Controls.Group>
                <Controls.Group className={`
                    hidden md-mobile:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                `}>
                    <Buttons.Play tooltipPlacement="top start" />
                </Controls.Group>
                <Controls.Group className={`
                    hidden md-mobile:block mx-4 mb-1`}>
                    <div className='flex justify-between items-center max-h-6'>
                        <TimeGroup />
                        <Buttons.Fullscreen tooltipPlacement="top end" />
                    </div>
                    <Sliders.Time thumbnails={thumbnails} />
                </Controls.Group>
                <Controls.Group className={`hidden md-mobile:block absolute top-0 right-[12px]`}>
                    <Menus.Settings placement="top left" tooltipPlacement="top" />
                </Controls.Group>
                <Controls.Group className="md-mobile:hidden -mt-0.5 flex w-full items-center px-2 pb-2">
                    <Buttons.Play tooltipPlacement="top start" />
                    <Buttons.Mute tooltipPlacement="top" />
                    <Sliders.Volume />
                    <TimeGroup />
                    <div className="flex-1" />
                    <Menus.Settings placement="top left" tooltipPlacement="top" />
                    <Buttons.PIP tooltipPlacement="top" />
                    <Buttons.Fullscreen tooltipPlacement="top end" />
                </Controls.Group>
            </Controls.Root>
        </>
    );
}

function Gestures() {
    return (
        <>
            <Gesture
                className="absolute inset-0 z-0 block h-full w-full"
                event="pointerup"
                action="toggle:paused"
            />
            <Gesture
                className="absolute inset-0 z-0 block h-full w-full"
                event="dblpointerup"
                action="toggle:fullscreen"
            />
            <Gesture
                className="absolute left-0 top-0 z-10 block h-full w-1/5"
                event="dblpointerup"
                action="seek:-10"
            />
            <Gesture
                className="absolute right-0 top-0 z-10 block h-full w-1/5"
                event="dblpointerup"
                action="seek:10"
            />
        </>
    );
}