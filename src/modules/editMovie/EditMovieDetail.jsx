import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense} from "react";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";
import FormComponent from "@components/form/Form.jsx";
import {TextArea} from "@components/textarea/TextArea.jsx";
import {CoolUploadFile} from "@components/coolUploadFile/CoolUploadFile.jsx";
import {Select} from "@components/select/Select.jsx";
import {Button} from "@components/button/Button.jsx";

export const EditMovieDetail = () => {
    const { response } = useLoaderData();
    const updateMovieInfo = studioStore(state => state.updateMovieInfo);
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['editMovieDetail'],
        mutationFn: (formData, movieCode) => updateMovieInfo(formData, movieCode),
        onSuccess : () => {
        //     тут будет всплывашка
        }
    })


    const onFinish = (evt, movieCode) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        mutate({formData, movieCode});
    }

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response} errorElement={<h5>Error</h5>}>
                { (response) => {
                        const deadPreview = response?.preview?.name || response?.defaultPreview?.name;
                    return (
                            <form
                                encType='multipart/form-data'
                                className='min-w-[700px] flex flex-col gap-2'
                                onSubmit={(event) => onFinish(event, response?.code)}>

                                <FormComponent.Item label='Название' name='name'>
                                    <TextArea defaultValue={response.name}
                                              showCounter={true}
                                              autoFocus={true}
                                              maxLength={130}/>
                                </FormComponent.Item>

                                <FormComponent.Item label='Описание' name='description'>
                                    <TextArea defaultValue={response.description}
                                              showCounter={true}
                                              autoFocus={true}
                                              rows={4}
                                              maxLength={5000}/>
                                </FormComponent.Item>

                                <FormComponent.Item label='Превью' name='preview'>
                                    <CoolUploadFile src={`${import.meta.env.VITE_DEV_URL}/api/file/${deadPreview}`}/>
                                </FormComponent.Item>


                                <div className='flex justify-between items-center gap-1'>
                                    <FormComponent.Item name='isPublished'>
                                        <Select
                                            currentStatus={response.isPublished}
                                            code={response.code}
                                            options={[
                                                { value: true, text: "Опубликовано" },
                                                { value: false, text: "Не опубликовано" }
                                            ]}/>
                                    </FormComponent.Item>

                                    <div className='flex items-center gap-1'>
                                        <Button
                                            styles='px-6 py-2.5'
                                            onClick={() => navigate(-1)}
                                            iconPosition="start"
                                            icon={<ArrowLeftOutlined/>}>
                                            Назад
                                        </Button>
                                        <Button styles='px-6 py-2.5' type='submit'>
                                            Отправить
                                        </Button>
                                    </div>
                                </div>
                            </form>
                    )}}
            </Await>
        </Suspense>
    )
}