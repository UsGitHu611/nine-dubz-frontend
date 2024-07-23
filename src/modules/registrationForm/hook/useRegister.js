import { useRegistrationStore } from "../store/store"
import { useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

export const useRegister = () => {
    const register = useRegistrationStore(state => state.register);
    const redirect = useNavigate();

    const handleRegister = useMutation({
        mutationKey: ['registerForm'],
        mutationFn: (formData) => register(formData),
        onSuccess: () => redirect("/", {
            replace: true,
            state : { isSuccess : true }
        })
    })
    
    return { handleRegister }
}