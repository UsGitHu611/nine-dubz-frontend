import {Flex, Input, Button, ConfigProvider, Avatar, Form} from "antd";
import {useComment} from "@modules/movieDetail/hook/useComment.js";

export const ReplyPanel = ({ code, parentId, setShowReplyPanel }) => {
    const [form] = Form.useForm();
    const { addReply } = useComment();

    const finishHandler = ({ text }) => {
        if(!text) return;
        addReply({code, parentId, text});
        form.resetFields();
    }

    return (
        <ConfigProvider theme={{
            components: { Input: { paddingInline: 0, borderRadius: "0" } }
        }}>
            <Form onFinish={finishHandler} form={form} className='pt-2 flex flex-col gap-2'>
                <Form.Item className='mb-0' name='text'>
                    <Flex gap={6}>
                        <Avatar/>
                        <Input.TextArea
                            id='replyPanel'
                            showCount
                            autoSize={{minRows: 1}}
                            maxLength={5000}
                            placeholder="Ответ"
                            variant="borderless" />
                    </Flex>
                </Form.Item>
                <Flex justify='end' gap={5}>
                    <Button onClick={() => setShowReplyPanel(false)}>Отмена</Button>
                    <Button htmlType='submit'>Ответить</Button>
                </Flex>
            </Form>
        </ConfigProvider>
    )
}