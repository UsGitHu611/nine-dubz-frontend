import { useLocation } from "react-router-dom";
import { notification } from "antd"

export const useShowSuccessReg = () => {
    const [api, contextHolder] = notification.useNotification();
    const { state } = useLocation();

    if(state?.isSuccess){
        api.open({
            icon: '✔',
            message: "Вы успешно зарегестрированы!",
            description: "В целях успешной авторизации подтвердите письмо, которое мы отправили вам на почту",
            showProgress: true,
            pauseOnHover: false
        });
    }

    return contextHolder
}