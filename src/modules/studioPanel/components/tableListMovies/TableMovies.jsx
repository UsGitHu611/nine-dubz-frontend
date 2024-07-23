import { Table, Select } from "antd";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {PacmanLoader} from "react-spinners";
import {Preview} from "@modules/studioPanel/components/preview/Preview.jsx";
import {NavLink} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";


export const TableMovies = () => {
    const getMoviesStudio = studioStore(state => state.getMoviesStudio);
    const updateMovieStatus = studioStore(state => state.updateMovieStatus);
    const deleteMovieStudio = studioStore(state => state.deleteMovieStudio);
    const setAllMovies = studioStore(state => state.setAllMovies);

    const studioMoviesInvalidate = useQueryClient();

    const { data: moviesStudio, isLoading } = useQuery({
        queryKey: ['studioMovies'],
        queryFn: getMoviesStudio
    })

    const { mutate } = useMutation({
        mutationKey: ['moviePublished'],
        mutationFn: (option) => updateMovieStatus(option),
        onSuccess: studioMoviesInvalidate.invalidateQueries({ queryKey: ['studioMovies'] })
    })

    const { mutate : deleteMovie } = useMutation({
        mutationKey: ['deleteMovieStudio'],
        mutationFn: (code) => deleteMovieStudio(code),
        onSuccess: studioMoviesInvalidate.invalidateQueries({ queryKey: ['studioMovies'] })
    })


    const columns = [
        {
            title: 'Фильм',
            dataIndex: 'movie',
            key: 'movie',
        }, {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'Доступ',
            dataIndex: 'access',
            key: 'access',
        }, {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            onCell : (rec) => {
                return {
                    onClick: () => deleteMovie(rec.key)
                }
            }
        }
    ];

    const dataMovies = () => {
        return moviesStudio?.map(({isPublished, name, code, createdAt, preview, defaultPreview}) => ({
            key: code,
            movie: <Preview defaultPreview={defaultPreview} preview={preview}/>,
            name: <NavLink className='hover:underline hover:text-gray-200' to={`/studio/edit/${code}`}>{name}</NavLink>,
            date : new Date(createdAt).toLocaleDateString(),
            access: <Select
                showArrow={false}
                variant='borderless'
                popupMatchSelectWidth={155}
                defaultValue={isPublished}
                options={[
                    { value: true, label: "Опубликовано" },
                    { value: false, label: "Не опубликовано" }
                ]}
                onChange={(value) => mutate({value, code})}/>,
                delete : <DeleteOutlined style={{ fontSize: "20px", color: "red"}}/>
        }))
    }


    return (
        <Table
            className='w-full'
            rowSelection={{
                onChange: (_, a) => {
                    const resultCheckedRows = a.map(el => ({ code: el.key }))
                    setAllMovies(resultCheckedRows);
                }
            }}
            size='small'
            loading={{
                spinning: isLoading,
                indicator: <PacmanLoader/>
            }}
            dataSource={dataMovies()}
            columns={columns}
            pagination/>
    )
}