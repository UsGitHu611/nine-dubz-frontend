import {useRegistrationStore} from "@modules/registrationForm/store/store.js";
import {useQuery} from "@tanstack/react-query";
import {cookie} from "@/helper/cookie.js";

export const useCheckAuth = () => {
    const isAuth = useRegistrationStore(state => state.isAuth);
    const getUserInfo = useRegistrationStore(state => state.getUserInfo);

    const {data: userInfo} = useQuery({
        queryKey: ['getUserInfo'],
        queryFn: getUserInfo,
        enabled: !!cookie.findKey('token'),
    })

    return {isAuth, userInfo};
}