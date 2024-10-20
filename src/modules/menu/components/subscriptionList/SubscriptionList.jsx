import {useQuery} from "@tanstack/react-query";
import {storeMenu} from "@modules/menu/store/store.js";
import {SubscriptionItem} from "@modules/menu/components/subscriptionItem/SubscriptionItem.jsx";

const SubscriptionList = () => {
    const getUsersChanel = storeMenu(state => state.getUsersChanel);

    const {data: subscriptionList, isLoading} = useQuery({
        queryKey: ['subscription'],
        queryFn : getUsersChanel
    });
    console.log(subscriptionList)
    return (
        <div>
            <h3 className='text-gray-200 text-[16px] pl-3 pt-1 font-medium pb-2'>
                Подписки
            </h3>
            <ul>
                { isLoading ? <div>xxx</div> : subscriptionList?.map(({id, name, picture}) => (
                    <SubscriptionItem
                        key={id}
                        channelId={id}
                        name={name}
                        picture={picture.name}/>
                ))}
            </ul>
        </div>
    )
}

export default SubscriptionList;