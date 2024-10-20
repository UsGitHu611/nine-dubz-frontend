import {Form, Input, Button} from "antd";
import { SendOutlined } from "@ant-design/icons";
import {useComment} from "@modules/movieDetail/hook/useComment.js";


export const CommentForm = ({code}) => {
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const { addComment } = useComment();

    const finishHandler = (body) => {
        addComment({...body, code});
        form.resetFields();
    }

    return (
        <Form className='md-mobile:hidden' form={form} onFinish={finishHandler}>
            <Form.Item name='comment'>
                <TextArea autoSize={{minRows: 3}} placeholder='Оставить комментарий...'/>
            </Form.Item>
            <Button htmlType='submit' icon={<SendOutlined style={{fontSize: "12px"}}/>} iconPosition='end'>
                Отправить
            </Button>
        </Form>
    )
}