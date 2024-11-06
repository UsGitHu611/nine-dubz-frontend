import {
    MailOutlined,
    LockOutlined,
    GoogleOutlined,
    EyeOutlined,
    EyeInvisibleOutlined, UserOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useRegister} from "./hook/useRegister";
import {useGetUrlGoogle} from "./hook/useGetUrlGoogle";
import FormComponent from "@components/form/Form.jsx";
import {Input} from "@components/input/Input.jsx";
import {useRef} from "react";
import {useChangeLogin} from "@modules/registrationForm/hook/useChangeLogin.js";
import {useCheckUniqueLogin} from "@modules/registrationForm/hook/useCheckUniqueLogin.js";
import {Button} from "@components/button/Button.jsx";
import {LoginInput} from "@modules/registrationForm/components/LoginInput.jsx";


const Registration = () => {
    const {handleRegister, message} = useRegister();
    const googleUrl = useGetUrlGoogle();
    const {login, changeLogin} = useChangeLogin();

    const s = (evt) => {
        evt.preventDefault();
        let f = new FormData(evt.target);
        console.log(Object.fromEntries(f))
    }

    return (
        <FormComponent.Form styles='min-w-[400px]' onSubmit={s}>

            <Link to={googleUrl} className='flex w-full gap-2 justify-center rounded-md border
                            border-gray-300 bg-white py-3 px-4 text-sm font-medium text-black shadow-sm'>
                <GoogleOutlined style={{fontSize: "20px"}}/> Sign Up with Google
            </Link>


            <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-xs text-gray-200 text-center uppercase whitespace-nowrap">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>


            <FormComponent.Item label='Login' name='name'>
                <LoginInput/>
            </FormComponent.Item>

            <FormComponent.Item label='Email' name='email'>
                <Input type="email" prefix={<MailOutlined className='text-gray-200'/>}/>
            </FormComponent.Item>

            <FormComponent.Item label='Password' name='password'>
                <Input type="password" prefix={<LockOutlined className='text-gray-200'/>}
                       postfix={<EyeOutlined className='text-gray-200'/>}/>
            </FormComponent.Item>

            <div className='flex items-center justify-between'>
                <Button type="submit" styles='px-4 py-3'>
                    Зарегистрироваться
                </Button>
                <Link className='text-gray-200' to='/signin'>Уже есть аккаунт?</Link>
            </div>

            <small className='text-red-500 block mt-2'>
                {message?.message}
            </small>

        </FormComponent.Form>
    );
}

export default Registration;

