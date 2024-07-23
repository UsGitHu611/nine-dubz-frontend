import {useUploadFile} from "@modules/studioPanel/hook/useUploadFile.js";
import {Form, Input, Upload, Button} from "antd";
import FormItem from "antd/es/form/FormItem";
import {PlusOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {useShallow} from "zustand/react/shallow";

export const EditMovie = () => {
    useUploadFile();
    const {filePos, isLoadFile, fileSize, createMovieInfo, showModal} = studioStore(
        useShallow(state => ({
            filePos: state.filePos,
            isLoadFile: state.isLoadFile,
            fileSize: state.fileData.size,
            createMovieInfo: state.createMovieInfo,
            showModal : state.showModal
        }))
    )
    const [form] = Form.useForm();
    const percent = Math.round((filePos / fileSize) * 100);

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