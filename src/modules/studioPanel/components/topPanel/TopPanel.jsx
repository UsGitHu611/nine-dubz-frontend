import {Button} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";

export const TopPanel = () => {
    const allMovies = studioStore(state => state.allMovies);
    const setShowModal = studioStore(state => state.setShowModal);
    const deleteAllMovieStudio = studioStore(state => state.deleteAllMovieStudio);

    const deleteAllMovies = (allMovies) => {
        if(!allMovies.length) return;
        deleteAllMovie(allMovies);
    }

    const { mutate : deleteAllMovie } = useMutation({
        mutationKey: ['deleteAllMoviesStudio'],
        mutationFn: (allMovies) => deleteAllMovieStudio(allMovies),
    })


    return (
        <div className='flex items-center gap-[6px]'>
            <Button
                onClick={() => deleteAllMovies(allMovies)}
                shape='circle'
                size='large'
                icon={<DeleteOutlined style={{ fontSize: "20px"}}/>}/>
            <Button onClick={setShowModal} className='max-w-[150px]' size='large' icon={<PlusOutlined />}>
                Добавить
            </Button>
        </div>
    )
}