import {TableMovies} from "@modules/studioPanel/components/tableListMovies/TableMovies.jsx";
import {Button, ConfigProvider, Flex, Modal, Steps} from "antd";
import {CloseOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {DragAndDrop} from "@modules/studioPanel/components/step-one/DragAndDrop.jsx";
import {EditMovie} from "@modules/studioPanel/components/step-two/EditMovie.jsx";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useShallow} from "zustand/react/shallow";
import {useMutation} from "@tanstack/react-query";

const content = [
    { content: <DragAndDrop/> },
    { content: <EditMovie/> }
]

const StudioPanel = () => {
    const { confirm } = Modal;
    const {
        step,
        allMovies,
        showModal,
        setFilePos,
        setShowModal,
        setCurrentStep,
        deleteAllMovieStudio
    } = studioStore(
        useShallow(state => ({
            step: state.step,
            showModal: state.showModal,
            allMovies: state.allMovies,
            setFilePos: state.setFilePos,
            setShowModal: state.setShowModal,
            setCurrentStep: state.setCurrentStep,
            setAbortConnection: state.setAbortConnection,
            deleteAllMovieStudio: state.deleteAllMovieStudio
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


    const { mutate : deleteAllMovie } = useMutation({
        mutationKey: ['deleteAllMoviesStudio'],
        mutationFn: (allMovies) => deleteAllMovieStudio(allMovies),
    })

    const deleteAllMovies = (allMovies) => {
        if(!allMovies.length) return;
        deleteAllMovie(allMovies);
    }


    return (
        <Flex gap={18} className='pt-[30px]' align='end' vertical>
            <Flex align='center' gap={6}>
                <Button
                    onClick={() => deleteAllMovies(allMovies)}
                    shape='circle'
                    size='large'
                    icon={<DeleteOutlined style={{ fontSize: "20px"}}/>}/>
                <Button onClick={setShowModal} className='max-w-[150px]' size='large' icon={<PlusOutlined />}>
                    Добавить
                </Button>
            </Flex>
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
        </Flex>
    )
}

export default StudioPanel;