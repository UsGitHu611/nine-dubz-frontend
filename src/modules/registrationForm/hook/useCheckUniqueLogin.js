import { useEffect } from 'react';
import {useRegistrationStore} from '../store/store';

export const useCheckUniqueLogin = () => {
    const login = useRegistrationStore(state => state.formData.login);
    const isUnique = useRegistrationStore(state => state.isUnique);
    const checkUniqueLogin = useRegistrationStore(state => state.checkUniqueLogin);

    useEffect(() => {
        let timeOutReq;

        if(login){
            timeOutReq = setTimeout(() => {
                checkUniqueLogin();
            },500)
        }
        return () => clearTimeout(timeOutReq)
    },[login])

    return isUnique;
}