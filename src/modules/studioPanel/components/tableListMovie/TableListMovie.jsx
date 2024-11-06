import {studioStore} from "@modules/studioPanel/store/store.js";
import {useQuery} from "@tanstack/react-query";
import {Preview} from "@modules/studioPanel/components/preview/Preview.jsx";
import {NavLink} from "react-router-dom";
import {Select} from "@components/select/Select.jsx";
import {DeleteOutlined} from "@ant-design/icons";
import {useWindowWidthContext} from "@/context/WindowWidthProvider.jsx";
import {useTableMovies} from "@modules/studioPanel/hook/useTableMovies.js";

export const TableListMovie = () => {
    const getMoviesStudio = studioStore(state => state.getMoviesStudio);
    const responsiveWidth = useWindowWidthContext();
    const tableAction = useTableMovies();
    
    const { data: moviesStudio, isLoading } = useQuery({
        queryKey: ['studioMovies'],
        queryFn: getMoviesStudio,
    })

    const optionSelect = [
        { value: true, text: "Опубликовано" },
        { value: false, text: "Не опубликовано" }
    ];

    const deleteMovieHandler = (code) => {
        tableAction.deleteMovie(code);
    }

    return (
        <div className='text-gray-200 bg-gray-800/30 w-full flex flex-col [&:has(#table-body:empty)]:hidden'>
            <div
                id="table-head"
                className='grid grid-cols-[repeat(4,minmax(0,1fr))_100px] [&>*]:p-4 border-b border-gray-200/10 border-solid text-sm font-medium'>
                <span>Фильм</span>
                <span>Название</span>
                <span>Дата</span>
                <span>Доступ</span>
            </div>

            <div id='table-body' className='text-sm'>
                {isLoading ? <h1>Loading</h1> : moviesStudio.map(({ defaultPreview, defaultPreviewWebp, createdAt, name, isPublished, code }) => (
                    <div key={code} className='hover:bg-gray-700/30 cursor-pointer grid grid-cols-[repeat(4,minmax(0,1fr))_100px] [&>*]:p-4 items-center'>

                        <Preview defaultPreview={defaultPreview} defaultPreviewWebp={defaultPreviewWebp}/>

                        <NavLink
                            title={name}
                            className='block hover:underline hover:text-gray-200 max-w-[190px] truncate'
                            to={`/studio/edit/${code}`}>
                            {name}
                        </NavLink>

                        <span>{new Date(createdAt).toLocaleDateString()}</span>

                        <Select options={optionSelect} currentStatus={isPublished} code={code}/>

                        <div className='w-full h-full hover:bg-gradient-to-l from-5% from-red-800/50 to-transparent
                            relative opacity-0 hover:opacity-100 transition-opacity duration-300 parent-to-children:scale-100
                            flex justify-center items-center' onClick={() => deleteMovieHandler(code) }>
                            <div className='scale-0 transition-transform duration-300'>
                                <DeleteOutlined className='text-lg text-red-600'/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}