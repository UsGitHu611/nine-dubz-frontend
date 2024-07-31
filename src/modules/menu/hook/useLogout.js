import {storeMenu} from "@modules/menu/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {useRegistrationStore} from "@modules/registrationForm/store/store.js";

export const useLogout = () => {
    const logoutReq = storeMenu(state => state.logout);
    const setAuth = useRegistrationStore(state => state.setAuth);

    const logout = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutReq,
        onSuccess: () => setAuth(false)
    })

    return logout;
}