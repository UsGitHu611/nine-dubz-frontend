export const Preview = ({ preview, defaultPreview }) => {
    const deadImage = preview === null && defaultPreview === null;

    return (
        <>
            { deadImage && <h2>Loading</h2> || (
                <img
                    className='w-[100px]'
                    src={`http://localhost:25565/api/file/${preview?.name || defaultPreview?.name}`}
                    alt='Превью'/>
            )}

        </>
    )
}