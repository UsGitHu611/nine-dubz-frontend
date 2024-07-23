export const Preview = ({ preview, defaultPreview }) => {
    return (
        <img src={`http://localhost:25565/api/file/${preview?.name || defaultPreview?.name}`} alt='preview'/>
    )
}