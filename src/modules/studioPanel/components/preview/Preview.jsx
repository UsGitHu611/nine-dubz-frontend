import {MoonLoader} from "react-spinners";


export const Preview = ({ preview, defaultPreview, defaultPreviewWebp, previewWebp }) => {
    const isVideoDead = defaultPreview === null;

    return (
        <>
            { isVideoDead ? (
                <div className='relative w-[100px] bg-gray-600 bg-blend-overlay'>
                    <MoonLoader
                        cssOverride={{
                            position: "absolute",
                            zIndex: 1,
                            top: "19%",
                            left: "32%",
                        }}
                        size={27.5}
                        color='#e3e3e3'
                        speedMultiplier={0.4}/>
                    <img
                        className='h-[59px] object-cover opacity-0'
                        src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                        loading='lazy'
                        alt='Превью'/>
                </div>
            ) : (
                <picture>
                    <source
                        type='image/webp'
                        srcSet={`${import.meta.env.VITE_DEV_URL}/api/file/${previewWebp?.name || defaultPreviewWebp?.name}`}/>
                    <img
                        className='h-[59px] object-cover'
                        src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                        loading='lazy'
                        alt='Превью'/>
                </picture>
            )}
        </>
    )
}