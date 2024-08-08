import {useUploadFile} from "@modules/studioPanel/hook/useUploadFile.js";
import {Form, Input, Upload, Button, App} from "antd";
import FormItem from "antd/es/form/FormItem";
import {PlusOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {useShallow} from "zustand/react/shallow";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";

export const EditMovie = () => {
    useUploadFile();
    const {
        file,
        filePos,
        fileSize,
        isLoadFile,
        setShowModal,
        setCurrentStep,
        createMovieInfo,
    } = studioStore(
        useShallow(state => ({
            file: state.file,
            filePos: state.filePos,
            showModal : state.showModal,
            isLoadFile: state.isLoadFile,
            fileSize: state.fileData.size,
            setShowModal : state.setShowModal,
            setCurrentStep: state.setCurrentStep,
            createMovieInfo: state.createMovieInfo,
        }))
    )
    const [form] = Form.useForm();
    const percent = Math.round((filePos / fileSize) * 100);
    const { notification } = App.useApp();
    const {t} = useTranslate();


    const { mutate } = useMutation({
        mutationKey: ['editMovie'],
        mutationFn: (formData) => createMovieInfo(formData),
        onSuccess : () => {
            notification.success({
                message: t('successAddTitle'),
                description: t('successAddDescription')
            })
            setCurrentStep(0);
            setShowModal(false);
        }
    })

    const onFinish = (data) => {
        const formData = new FormData();
        for (const fieldData in data) {
            formData.set(fieldData, data[fieldData] || "")
        }
       mutate(formData);
    }

    return (
        <Form
            encType='multipart/form-data'
            className='pt-5'
            form={form}
            initialValues={{ name: file.name }}
            onFinish={onFinish}
            layout='vertical'>

            <FormItem
                label='Название'
                rules={[ { required: true, message: "Даб-Даб!!!" } ]}
                name='name'>
                <Input.TextArea
                    name='name'
                    showCount
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
                <Button size='large' disabled={!isLoadFile} htmlType="submit">
                    Отправить
                </Button>
            </FormItem>

            <FormItem>
                <code className='text-gray-200 text-lg'>
                    Загруженно: {percent}%...
                </code>
            </FormItem>
        </Form>
    )
}