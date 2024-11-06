import { useRegistrationStore } from "../store/store"
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";

export const useRegister = () => {
    const register = useRegistrationStore(state => state.register);
    const redirect = useNavigate();
    const {t} = useTranslate();

    const {mutate: handleRegister, data : message} = useMutation({
        mutationKey: ['registerForm'],
        mutationFn: (formData) => register(formData),
        onSuccess: (data) => {
            if(data?.status !== 'error'){
                return redirect("/");
            }
        }
    })


    return { handleRegister, message }
}