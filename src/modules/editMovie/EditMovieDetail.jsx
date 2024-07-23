import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import FormItem from "antd/es/form/FormItem";
import {Button, Form, Input, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";

export const EditMovieDetail = () => {
    const { response } = useLoaderData();
    const [form] = Form.useForm();
    const createMovieInfo = studioStore(state => state.createMovieInfo);

    const { mutate, data: success } = useMutation({
        mutationKey: ['editMovie'],
        mutationFn: (formData) => createMovieInfo(formData)
    })

    const onFinish = (data) => {
        const formData = new FormData();
        for (const fieldData in data) {
            formData.set(fieldData, data[fieldData])
        }
        mutate(formData);
    }

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response} errorElement={<h5>Error</h5>}>
                { (r) => (
                    <Form encType='multipart/form-data' className='pt-5' form={form} onFinish={onFinish} layout='vertical'>

                        <FormItem label='Название' required name='name'>
                            <Input.TextArea
                                name='name'
                                showCount
                                placeholder='сааабтайтз бай диматорзок'
                                autoSize={{ minRows: 2, maxRows: 2 }}
                                maxLength={130}/>
                        </FormItem>

                        <FormItem label='Описание' name='description'>
                            <Input.TextArea
                                name='description'
                                placeholder='сааабтайтз бай диматорзок'
                                autoSize={{ minRows: 5 }}
                                showCount
                                maxLength={5000}/>
                        </FormItem>


                        <FormItem
                            valuePropName='file'
                            getValueFromEvent={(event) => {
                                return event?.file.originFileObj;
                            }}
                            label='Превью'
                            name='preview'>
                            <Upload
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                listType='picture-card'
                                maxCount={1}>
                                <PlusOutlined className='text-gray-200'/>
                            </Upload>
                        </FormItem>

                        <FormItem className='flex justify-end mb-0'>
                            <Button size='large' htmlType="submit">
                                Отправить
                            </Button>
                        </FormItem>

                    </Form>
                ) }
            </Await>
        </Suspense>
    )
}