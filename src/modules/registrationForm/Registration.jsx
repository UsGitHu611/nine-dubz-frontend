import { Form, Input, Button, Flex, Tooltip } from "antd";
import { MailOutlined, LockOutlined, InfoCircleOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ListRules } from "./components/listRules/ListRules"
import { useRegister } from "./hook/useRegister";
import { useGetUrlGoogle } from "./hook/useGetUrlGoogle";
import { rulesEmail, rulesPassword, tooltipRulesPassword } from "./configForm"
import { InputLogin } from "./components/inputLogin/InputLogin";


export const Registration = () => {
    const [form] = Form.useForm();
    const { handleRegister, userInfo} = useRegister();
    const googleUrl = useGetUrlGoogle();

    return (
        <Form className='min-w-80' onFinish={handleRegister.mutate} form={form} layout="vertical">

            <Form.Item>
                <Link to={googleUrl} className='flex w-full gap-2 justify-center rounded-md border
                            border-gray-300 bg-white py-3 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-50'>
                    <GoogleOutlined style={{fontSize: "20px"}}/>
                    Sign Up with Google
                </Link>
            </Form.Item>

            <Form.Item>
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-4 text-xs text-gray-200 text-center uppercase whitespace-nowrap">Or</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>
            </Form.Item>

            <InputLogin />

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

            <Form.Item>
                <Flex align='center' justify='space-between'>
                    <Button type="default" htmlType="submit">
                        Регистрация
                    </Button>
                    <Link className='text-gray-200' to='/signin'>
                        Уже есть аккаунт?
                    </Link>
                </Flex>
            </Form.Item>

        </Form>
    );
}

