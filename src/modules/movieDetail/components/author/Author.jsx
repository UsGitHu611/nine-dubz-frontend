import {movieDetailStore} from "@modules/movieDetail/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";

export const Author = ({ picture, name, userId }) => {
    const subscribe = movieDetailStore(state => state.subscribe);
    const subscribedDynamic = movieDetailStore(state => state.subscribed);

    const { mutate : subscribeThat } = useMutation({
        mutationKey : ['subscribe'],
        mutationFn: (options) => subscribe(options),
        onSuccess: () => movieDetailStore.setState(prev => ({subscribed : !prev.subscribed}))
    });
    const methodReq = subscribedDynamic ? "DELETE" : "POST";

    return (
        <div className='flex items-center gap-[10px]'>
            <PictureOrSavingLetter
                userPicture={picture?.name}
                userName={name}
            />
            <h3 className='text-gray-200 text-[16px] truncate'>{name}</h3>
            <button
                className={`${subscribedDynamic ? 'bg-gray-800 text-gray-200' : 'bg-gray-300'} 
                    hover:bg-white/40 transition-colors px-4 py-2 rounded-[18px] font-medium md-mobile:ml-auto`}
                onClick={() => subscribeThat({userId, method : methodReq})}>
                { subscribedDynamic ?  'Отписаться' : 'Подписаться' }
            </button>
        </div>
    )
}