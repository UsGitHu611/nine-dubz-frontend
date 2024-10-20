import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useState} from "react";
import FormItem from "antd/es/form/FormItem";
import {App, Button, Form, Input, Select, Upload} from "antd";
import {ArrowLeftOutlined, PlusOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";

export const EditMovieDetail = () => {
    const { response } = useLoaderData();
    const [form] = Form.useForm();
    const [prevPreview, setPrevPreview] = useState("");
    const updateMovieInfo = studioStore(state => state.updateMovieInfo);
    const {t} = useTranslate();
    const { notification } = App.useApp();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['editMovieDetail'],
        mutationFn: (formData, movieCode) => updateMovieInfo(formData, movieCode),
        onSuccess : () => {
            notification.success({
                message: t('successDetailEditTitle'),
                description: t('successDetailEditDescription')
            })
        }
    })


    const onFinish = (data, movieCode) => {
        const formData = new FormData();

        for (let dataField in data) {

            if(prevPreview === data[dataField]){
                continue;
            }

            if(!data[dataField]){
                formData.set(dataField, 'false');
                continue;
            }

            formData.set(dataField, data[dataField]);
        }
        setPrevPreview(data.preview);
        mutate({formData, movieCode});
    }

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response} errorElement={<h5>Error</h5>}>
                { (r) => {
                        const deadPreview = r?.preview?.name || r?.defaultPreview?.name;
                    return (
                            <Form
                                initialValues={{
                                    name: r?.name,
                                    description: r?.description,
                                    isPublished: r?.isPublished,
                                    preview: r?.preview?.name
                                }}
                                encType='multipart/form-data'
                                className='w-[700px]'
                                form={form}
                                onLoad={() => setPrevPreview(r?.preview?.name)}
                                onFinish={(d) => onFinish(d, r?.code)}
                                layout='vertical'>

                                <FormItem label='Название' required name='name'>
                                    <Input.TextArea
                                        name='name'
                                        showCount
                                        rules={[ { required: true, message: "Даб-Даб!!!" } ]}
                                        placeholder='сааабтайтз бай диматорзок'
                                        autoSize={{ minRows: 2, maxRows: 2 }}
                                        maxLength={130}/>
                                </FormItem>

                                <FormItem
                                    label='Описание'
                                    name='description'>
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
                                        return event?.fileList[0]?.originFileObj;
                                    }}
                                    label='Превью'
                                    name='preview'>
                                    <Upload
                                        customRequest={({ onSuccess }) => onSuccess('ok')}
                                        listType='picture-card'
                                        defaultFileList={ deadPreview ? [
                                            { url: `${import.meta.env.VITE_DEV_URL}/api/file/${deadPreview}`}
                                        ] : []}
                                        maxCount={1}>
                                        <PlusOutlined className='text-gray-200'/>
                                    </Upload>
                                </FormItem>

                                <FormItem name='isPublished'>
                                    <Select showArrow={false}
                                            variant='borderless'
                                            popupMatchSelectWidth={155}
                                            options={[
                                                { value: true, label: "Опубликовано" },
                                                { value: false, label: "Не опубликовано" }
                                            ]}
                                    />
                                </FormItem>

                                <FormItem className='flex justify-end'>
                                    <div className='flex justify-end items-center'>
                                        <Button className='mr-2' onClick={() => navigate(-1)} size='large'>
                                            <ArrowLeftOutlined />
                                            Назад
                                        </Button>
                                        <Button size='large' htmlType="submit">
                                            Отправить
                                        </Button>
                                    </div>
                                </FormItem>

                            </Form>
                    )
                } }
            </Await>
        </Suspense>
    )
}