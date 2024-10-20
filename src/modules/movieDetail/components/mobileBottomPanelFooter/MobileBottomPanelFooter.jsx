import {Button, Form, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useContext, useRef} from "react";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";


export const MobileBottomPanelFooter = ({ placeholder, panelType, parentId }) => {
    const commentListContext = useContext(MobileCommentContext);
    const dialogRef = useRef(null);
    const [form] = Form.useForm();
    const { addComment, addReply } = useComment();

    const finishHandler = (body) => {
        if(panelType === 'comment'){
            addComment({...body, code : commentListContext.code});
        }
        addReply({code : commentListContext.code, parentId, ...body})
        form.resetFields();
    }

    return (
        <dialog ref={dialogRef} aria-label='textarea-field'
                className='sticky bottom-0 right-0 left-0 bg-inherit border-t
                border-white/10 block min-w-full backdrop:bg-black/40 m-0'>
            <Form className='w-full flex p-2 gap-1 items-center' form={form} onFinish={finishHandler}>
                <Form.Item className='grow mb-0' name={panelType}>
                    <Input.TextArea
                        onFocus={() => {
                            dialogRef.current.showModal()
                            document.body.classList.add('scroll-lock')
                        }}
                        onBlur={() => {
                            dialogRef.current.close()
                            document.body.classList.remove('scroll-lock')
                        }}
                        placeholder={placeholder}
                        autoSize={{maxRows: 3}}/>
                </Form.Item>
                <Button
                    className='mb-auto'
                    size='large'
                    htmlType='submit'
                    icon={<SendOutlined />}
                    type='text'/>
            </Form>
        </dialog>
    )
}