import {Link} from "react-router-dom";
import {GoogleOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import {useGetUrlGoogle} from "@modules/registrationForm/hook/useGetUrlGoogle.js";
import {useLogin} from "@modules/login/hook/useLogin.js";
import FormComponent from "@components/form/Form.jsx";
import {Input} from "@/components/input/Input.jsx"
import {Button} from "@components/button/Button.jsx";

const Login = () => {
    const googleUrl = useGetUrlGoogle();
    const { signIn, message } = useLogin();

    const submitHandler = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        console.log(Object.fromEntries(formData))
        // signIn.mutate();
    }

    return (
       <FormComponent.Form styles='min-w-[400px]' onSubmit={submitHandler}>

           <Link to={googleUrl} className='flex w-full gap-2 justify-center rounded-md border
                            border-gray-300 bg-white py-3 px-4 text-sm font-medium text-black shadow-sm hover:text-blue-500 transition-colors'>
               <GoogleOutlined style={{fontSize: "20px"}}/>
               Sign In with Google
           </Link>

           <div className="relative flex items-center">
               <div className="flex-grow border-t border-gray-200"></div>
               <span className="mx-4 text-xs text-gray-200 text-center uppercase whitespace-nowrap">Or</span>
               <div className="flex-grow border-t border-gray-200"></div>
           </div>

           <FormComponent.Item className='text-gray-200' label='Email' name='email'>
               <Input type='mail' prefix={<MailOutlined/>}/>
           </FormComponent.Item>

           <FormComponent.Item className='text-gray-200' label='Password' name='password'>
               <Input type='password' prefix={<LockOutlined/>}/>
           </FormComponent.Item>
           {message && <small className='text-red-500 block mt-2'>
               {message}
           </small> }

           <div className='flex items-center justify-between'>
               <Button type="submit" styles='px-5 py-2'>
                   Войти
               </Button>
               <Link className='text-gray-200' to='/signup'>
                   Еще нет аккаунта?
               </Link>
           </div>

       </FormComponent.Form>
    )
}

export default Login;