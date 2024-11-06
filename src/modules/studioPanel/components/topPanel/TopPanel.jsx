import {PlusOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {Button} from "@components/button/Button.jsx";

export const TopPanel = () => {
    const setShowModal = studioStore(state => state.setShowModal);

    return (
        <div className='flex items-center gap-[6px]'>
            <Button onClick={() => setShowModal(true)} icon={<PlusOutlined />} styles='py-2 px-5'>
                Добавить
            </Button>
        </div>
    )
}