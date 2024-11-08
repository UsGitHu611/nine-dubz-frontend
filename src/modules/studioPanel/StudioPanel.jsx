import {Steps} from "antd";
import {DragAndDrop} from "@modules/studioPanel/components/step-one/DragAndDrop.jsx";
import {EditMovie} from "@modules/studioPanel/components/step-two/EditMovie.jsx";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useShallow} from "zustand/react/shallow";
import {TopPanel} from "@modules/studioPanel/components/topPanel/TopPanel.jsx";
import {TableListMovie} from "@modules/studioPanel/components/tableListMovie/TableListMovie.jsx";
import {Modal} from "@components/modal/Modal.jsx";

const content = [
    { content: <DragAndDrop/> },
    { content: <EditMovie/> }
];

const StudioPanel = () => {
    const { step, showModal, setFilePos, setShowModal, setCurrentStep } = studioStore(
        useShallow(state => ({
            step: state.step,
            showModal: state.showModal,
            setFilePos: state.setFilePos,
            setShowModal: state.setShowModal,
            setCurrentStep: state.setCurrentStep,
            setAbortConnection: state.setAbortConnection
        }))
    )
    // const showConfirm = () => {
    //     confirm({
    //         title: <h3 className='text-gray-200'>Отмена загрузки</h3>,
    //         icon: '⁉',
    //         content: <p className='text-gray-200'>Вся информация о видео, которую вы добавили, будет удалена.</p>,
    //         okText: 'Отменить загрузку',
    //         cancelText: 'Закрыть',
    //         onOk() {
    //             setFilePos(0);
    //             setCurrentStep(0);
    //             setShowModal(false);
    //             document.dispatchEvent(new CustomEvent("wsClose"));
    //         },
    //         onCancel() {
    //             setShowModal(true);
    //         },
    //     });
    // };

    return (
        <div className='flex gap-4 flex-row-reverse items-center '>
            <TopPanel />
            <Modal setShowModal={setShowModal} showModal={showModal} width={900}>
                <Steps
                    size='small'
                    labelPlacement='horizontal'
                    progressDot
                    current={step}
                    items={[]}/>
                { content[step].content }
            </Modal>

            <TableListMovie />
        </div>
    )
}

export default StudioPanel;