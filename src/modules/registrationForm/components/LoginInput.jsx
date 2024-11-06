import {UserOutlined} from "@ant-design/icons";
import {Input} from "@components/input/Input.jsx";
import {useCheckUniqueLogin} from "@modules/registrationForm/hook/useCheckUniqueLogin.js";
import {useChangeLogin} from "@modules/registrationForm/hook/useChangeLogin.js";
import {useEffect, useRef} from "react";

export const LoginInput = () => {
    const {login, changeLogin} = useChangeLogin();
    const isUnique = useCheckUniqueLogin();
    const inputRef = useRef(null);

    useEffect(() => {
        console.log(isUnique)
    },[])

    return (
        <Input
            value={login}
            onChange={isUnique}
            ref={inputRef}
            size='large'
            prefix={<UserOutlined className='text-gray-200'/>}
        />
    )
}