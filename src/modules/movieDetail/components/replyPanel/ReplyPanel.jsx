import {Form} from "antd";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {TextArea} from "@components/textarea/TextArea.jsx";
import {Button} from "@components/button/Button.jsx";

export const ReplyPanel = ({ code, parentId, setShowReplyPanel }) => {
    const [form] = Form.useForm();
    const actionComment = useComment();

    const finishHandler = ({ text }) => {
        if(!text) return;
        actionComment.addReply({code, parentId, text});
        form.resetFields();
    }

    return (
        <Form onFinish={finishHandler} form={form} className='pt-2 flex flex-col gap-2'>
            <Form.Item className='mb-0' name='text'>
                <div className='flex gap-1.5'>
                    <PictureOrSavingLetter/>
                    <TextArea showCounter name='text' maxLength={5000} placeholder='Введите ваш комментарий...'/>
                </div>
            </Form.Item>
            <div className='flex justify-end gap-1.5'>
                <Button styles='px-5 py-2' onClick={() => setShowReplyPanel(false)}>Отмена</Button>
                <Button styles='px-5 py-2' htmlType='submit'>Ответить</Button>
            </div>
        </Form>
    )
}