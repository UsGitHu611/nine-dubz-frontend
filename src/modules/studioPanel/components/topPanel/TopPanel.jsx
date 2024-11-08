import {PlusOutlined} from "@ant-design/icons";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {Button} from "@components/button/Button.jsx";

export const TopPanel = () => {
    const setShowModal = studioStore(state => state.setShowModal);

    return (
        <Button
            onClick={() => setShowModal(true)}
            icon={<PlusOutlined />}
            styles='py-5 px-5 self-start'/>
    )
}