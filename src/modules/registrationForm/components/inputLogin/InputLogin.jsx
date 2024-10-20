import {Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useCheckUniqueLogin} from "@modules/registrationForm/hook/useCheckUniqueLogin"
import {rulesLogin} from "@modules/registrationForm/configForm"
import {useEffect, useRef} from "react";
import {useChangeLogin} from "@modules/registrationForm/hook/useChangeLogin.js";

export const InputLogin = () => {
    const inputRef = useRef(null);
    const {login, changeLogin} = useChangeLogin();
    const isUnique = useCheckUniqueLogin();

    useEffect(() => {
        inputRef && inputRef.current.focus();
    }, [])

    return (
        <Form.Item
            className='text-gray-200'
            hasFeedback
            validateStatus={isUnique ? "error" : "success"}
            help={isUnique && "Пользователь с таким именем уже существует"}
            label='Login'
            name='name'
            rules={[rulesLogin]}>
            <Input
                value={login}
                onChange={(e) => changeLogin(e.target.value)}
                ref={inputRef}
                size='large'
                prefix={<UserOutlined/>}
                />
        </Form.Item>
    );
}

