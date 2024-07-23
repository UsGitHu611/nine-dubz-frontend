import { useRegistrationStore } from "@modules/registrationForm/store/store.js";

export const useChangeLogin = () => {
    const login = useRegistrationStore(state => state.formData.login);
    const changeLogin = useRegistrationStore(state => state.changeLogin);

    return { login, changeLogin }
}