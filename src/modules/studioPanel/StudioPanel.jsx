import {TableMovies} from "@modules/studioPanel/components/tableListMovies/TableMovies.jsx";
import {ConfigProvider, Modal, Steps} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {DragAndDrop} from "@modules/studioPanel/components/step-one/DragAndDrop.jsx";
import {EditMovie} from "@modules/studioPanel/components/step-two/EditMovie.jsx";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useShallow} from "zustand/react/shallow";
import {TopPanel} from "@modules/studioPanel/components/topPanel/TopPanel.jsx";

const content = [
    { content: <DragAndDrop/> },
    { content: <EditMovie/> }
]

const StudioPanel = () => {
    const { confirm } = Modal;
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

    const showConfirm = () => {
        confirm({
            title: <h3 className='text-gray-200'>Отмена загрузки</h3>,
            icon: '⁉',
            content: <p className='text-gray-200'>Вся информация о видео, которую вы добавили, будет удалена.</p>,
            okText: 'Отменить загрузку',
            cancelText: 'Закрыть',
            onOk() {
                setFilePos(0);
                setCurrentStep(0);
                setShowModal(false);
                document.dispatchEvent(new CustomEvent("wsClose"));
            },
            onCancel() {
                setShowModal(true);
            },
        });
    };

    return (
        <div className='flex flex-col gap-4 pt-[30px] items-end'>
            <TopPanel />
            <ConfigProvider theme={{
                components: {
                    Modal: {
                        contentBg: "#292a2e",
                        paddingMD: "45px 45px",
                        colorIcon: "rgb(229 231 235 / 10)",
                        colorIconHover: "rgb(229 255 255)"
                    }
                }
            }}>
                <Modal
                        width={900}
                        open={showModal}
                        footer={false}
                        onCancel={step ? showConfirm : () => setShowModal(false)}
                        closeIcon={
                            <CloseOutlined className='text-[17px] p-[6px] rounded-[3px]
                             hover:bg-neutral-700 transition-colors duration-500'/>
                        }>
                    <Steps
                        size='small'
                        labelPlacement='horizontal'
                        progressDot
                        current={step}
                        items={[]}/>
                    <div>{ content[step].content }</div>
                </Modal>
            </ConfigProvider>
            <TableMovies/>
        </div>
    )
}

export default StudioPanel;