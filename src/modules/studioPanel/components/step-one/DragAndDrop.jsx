import {Button, Flex, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";

export const DragAndDrop = () => {
    const createMovie = studioStore(state => state.createMovie);

    return (
        <Upload.Dragger
            customRequest={createMovie}
            showUploadList={false}
            openFileDialogOnClick={false}>

            <Flex className='min-h-[500px]' justify='center' align='center' gap={15} vertical>
                <UploadOutlined style={{
                    fontSize: "40px",
                    color: "rgb(229 231 235)"
                }}/>
                <h3 className='text-gray-100 text-[17px] underline'>
                    Перетащите файлы сюда или нажмите кнопку ниже, чтобы выбрать их на компьютере.
                </h3>
                <p className='text-gray-300 text-[14px]'>
                    Пока вы не опубликуете видео, доступ к ним будет ограничен.
                </p>
                <Upload customRequest={createMovie}>
                    <Button>Выбрать файл</Button>
                </Upload>

            </Flex>

        </Upload.Dragger>
    )
}