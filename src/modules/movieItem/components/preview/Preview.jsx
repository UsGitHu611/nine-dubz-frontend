export const Preview = ({ preview, defaultPreview }) => {
    return (
        <img
            className='object-cover'
            src={`${import.meta.env.VITE_DEV_URL}/api/file/${preview?.name || defaultPreview?.name}`}
            alt='preview'/>
    )
}