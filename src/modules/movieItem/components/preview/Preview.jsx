export const Preview = ({ preview, defaultPreview, webpPreview, webpDefaultPreview }) => {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`${import.meta.env.VITE_DEV_URL}/api/file/${webpPreview?.name || webpDefaultPreview?.name}`}/>
            <img
                src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
                className='object-cover max-h-[201px] w-full md-mobile:min-h-[300px] sm-mobile:min-h-[220px]'
                loading='lazy'
                width={326}
                height={201}
                alt='preview'/>
        </picture>
    )
}