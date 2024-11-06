import {Spinner} from "@vidstack/react";

export const BufferingIndicator = () => {
    return (
        <div className="pointer-events-none div-center z-10 flex w-full aspect-square items-center justify-center md-mobile:w-1/6">
            <Spinner.Root className="text-white opacity-0 transition-opacity duration-500
            ease-linear media-buffering:animate-spin media-buffering:opacity-100" size={84}>
                <Spinner.Track className="opacity-25" width={8}/>
                <Spinner.TrackFill className="opacity-75" width={8}/>
            </Spinner.Root>
        </div>
    )
}