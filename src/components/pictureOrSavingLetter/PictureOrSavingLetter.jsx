export const PictureOrSavingLetter = ({ userPicture, userName }) => {

    return (
        <>
            { userPicture ? (
                <img
                    className='w-8 h-8 object-cover rounded-full self-start pointer-events-none'
                    src={`${import.meta.env.VITE_DEV_URL}/api/file/${userPicture}`}
                    alt="user-avatar"/>
            ) : (
                <span className='shrink-0 uppercase w-8 h-8 flex justify-center items-center
                    rounded-full bg-gray-700 text-gray-200 self-start pointer-events-none'>
                    { userName[0] }
                </span>
            )}
        </>
    )
}