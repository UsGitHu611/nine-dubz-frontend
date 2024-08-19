export const Preview = ({ preview, defaultPreview, webpPreview, webpDefaultPreview }) => {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`${import.meta.env.VITE_DEV_URL}/api/file/${webpPreview?.name || webpDefaultPreview?.name}`}/>
            <img
                src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                className='object-cover h-[193px] w-[340px] md-mobile:h-[275px] sm-mobile:h-[220px]'
                loading='lazy'
                width={326}
                height={201}
                alt='preview'/>
        </picture>
    )
}