import {useUploadFile} from "@modules/studioPanel/hook/useUploadFile.js";
import {CloudUploadOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useMutation} from "@tanstack/react-query";
import {useShallow} from "zustand/react/shallow";
import {TextArea} from "@components/textarea/TextArea.jsx";
import FormComponent from "@components/form/Form.jsx";
import {Button} from "@components/button/Button.jsx";
import {CoolUploadFile} from "@components/coolUploadFile/CoolUploadFile.jsx";

export const EditMovie = () => {
    useUploadFile();
    const {
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
    const percent = Math.round((filePos / fileSize) * 100);


    const { mutate } = useMutation({
        mutationKey: ['editMovie'],
        mutationFn: (formData) => createMovieInfo(formData),
        onSuccess : () => {
            setCurrentStep(0);
        }
    })

    const onFinish = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        if(!formData.get("description").trim().length){
            formData.set("description", "Тут не будет никакого описания, ведь я чмо без фантазии")
        }
        mutate(formData);
        setShowModal(false);
    }

    return (
        <form
            className='flex flex-col justify-between h-full'
            encType='multipart/form-data'
            onSubmit={onFinish}>


            <FormComponent.Item label='Название' name='name'>
                <TextArea
                    autoFocus={true}
                    maxLength={130}
                    placeholder='сааабтайтз бай диматорзок'/>
            </FormComponent.Item>


            <FormComponent.Item label='Описание' name='description'>
                <TextArea
                    maxLength={5000}
                    showCounter={true}
                    rows={4}
                    placeholder='сааабтайтз бай диматорзок'/>
            </FormComponent.Item>


            <FormComponent.Item label='Превью' name='preview'>
                <CoolUploadFile/>
            </FormComponent.Item>

            <div className='flex justify-between items-center'>
                <code className='text-gray-200 text-lg'>
                    Загруженно: {percent}%...
                </code>
                <Button disabled={!isLoadFile} styles='px-6 py-3' icon={<CloudUploadOutlined />}>
                    Отправить
                </Button>
            </div>
        </form>
    )
}