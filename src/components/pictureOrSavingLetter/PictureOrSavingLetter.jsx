import {useRegistrationStore} from "@modules/registrationForm/store/store.js";

export const PictureOrSavingLetter = () => {
    const userInfo = useRegistrationStore(state => state.userInfo);
    return (
        <>
            { userInfo.picture ? (
                <img
                    className='w-8 h-8 object-cover rounded-full pointer-events-none self-baseline'
                    src={`${import.meta.env.VITE_DEV_URL}/api/file/${userInfo.picture.name}`}
                    alt="user-avatar"/>
            ) : (
                <span className='shrink-0 uppercase w-8 h-8 flex justify-center items-center
                    rounded-full bg-gray-700 text-gray-200 pointer-events-none self-baseline'>
                    { userInfo.name[0] }
                </span>
            )}
        </>
    )
}