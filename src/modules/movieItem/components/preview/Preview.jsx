export const Preview = ({ preview, defaultPreview, webpPreview, webpDefaultPreview }) => {
    return (
        <picture>
            <source
                type="image/webp"
                className='object-cover h-[210px] md-mobile:h-[275px] sm-mobile:h-[220px]'
                srcSet={`${import.meta.env.VITE_DEV_URL}/api/file/${webpPreview?.name || webpDefaultPreview?.name}`}/>
            <img
                className='object-cover h-[210px] md-mobile:h-[275px] sm-mobile:h-[220px]'
                src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                loading='lazy'
                alt='preview'/>
        </picture>

    )
}