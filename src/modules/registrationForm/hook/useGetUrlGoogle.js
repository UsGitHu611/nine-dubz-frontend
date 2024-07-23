import { useEffect } from "react";
import { useRegistrationStore } from "../store/store"

export const useGetUrlGoogle = () => {
    const getUrlGoogle = useRegistrationStore(state => state.getUrlGoogle);
    const googleUrl = useRegistrationStore(state => state.googleUrl);

    useEffect(() => {
        getUrlGoogle();
    },[])

    return googleUrl;
}