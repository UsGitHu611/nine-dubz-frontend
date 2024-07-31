import {useMutation} from "@tanstack/react-query";
import {storeLogin} from "@modules/login/store/store.js";
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
    const login = storeLogin(state => state.login);
    const message = storeLogin(state => state.message);
    const redirect = useNavigate();

    const signIn = useMutation({
        mutationKey: ['login'],
        mutationFn: (data) => login(data),
        onSuccess: (data) => {
            if(data?.status !== 'error'){
                return redirect("/");
            }
        }
    });

    return { signIn, message }
}