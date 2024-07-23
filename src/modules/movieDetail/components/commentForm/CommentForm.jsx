import {Form, Input, Button} from "antd";
import { SendOutlined } from "@ant-design/icons";

export const CommentForm = () => {
    const { TextArea } = Input;

    return (
        <Form>
            <Form.Item>
                <TextArea autoSize={{minRows: 3}} placeholder='Оставить комментарий...'/>
            </Form.Item>
            <Button icon={<SendOutlined style={{fontSize: "12px"}}/>} iconPosition='end'>
                Отправить
            </Button>
        </Form>
    )
}