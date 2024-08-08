import {Button, Flex, Form, Input, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {GoogleOutlined, InfoCircleOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import {useGetUrlGoogle} from "@modules/registrationForm/hook/useGetUrlGoogle.js";
import {rulesEmail, rulesPassword, tooltipRulesPassword} from "@modules/registrationForm/configForm.js";
import {ListRules} from "@modules/registrationForm/components/listRules/ListRules.jsx";
import {useLogin} from "@modules/login/hook/useLogin.js";

const Login = () => {
    const [form] = Form.useForm();
    const googleUrl = useGetUrlGoogle();
    const { signIn, message } = useLogin();

    return (
       <Form className='min-w-80' onFinish={signIn.mutate} form={form} layout="vertical">

           <Form.Item>
               <Link to={googleUrl} className='flex w-full gap-2 justify-center rounded-md border
                            border-gray-300 bg-white py-3 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-50'>
                   <GoogleOutlined style={{fontSize: "20px"}}/>
                   Sign In with Google
               </Link>
           </Form.Item>

           <Form.Item>
               <div className="relative flex items-center">
                   <div className="flex-grow border-t border-gray-200"></div>
                   <span className="mx-4 text-xs text-gray-200 text-center uppercase whitespace-nowrap">Or</span>
                   <div className="flex-grow border-t border-gray-200"></div>
               </div>
           </Form.Item>

           <Form.Item className='text-gray-200' label='Email' name='email' rules={[rulesEmail]}>
               <Input size='large' prefix={<MailOutlined />} />
           </Form.Item>

           <Form.Item className='text-gray-200' label='Password' name='password' rules={[rulesPassword]}>
               <Input size='large' prefix={<LockOutlined />} suffix={
                   <Tooltip placement='right' title={
                       <ListRules listRiles={tooltipRulesPassword} field='Пароль' />
                   }>
                       <InfoCircleOutlined />
                   </Tooltip>
               } />
           </Form.Item>
           {message && <small className='text-red-500 block mt-2'>
               {message}
           </small> }


           <Form.Item>
               <Flex align='center' justify='space-between'>
                   <Button type="default" htmlType="submit">
                       Войти
                   </Button>
                   <Link className='text-gray-200' to='/signup'>
                       Еще нет аккаунта?
                   </Link>
               </Flex>
           </Form.Item>
       </Form>
    )
}

export default Login;