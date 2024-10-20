import {Table, Select, ConfigProvider, Empty} from "antd";
import {useQuery} from "@tanstack/react-query";
import {studioStore} from "@modules/studioPanel/store/store.js";
import {PacmanLoader} from "react-spinners";
import {Preview} from "@modules/studioPanel/components/preview/Preview.jsx";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, ExperimentOutlined} from "@ant-design/icons";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";
import {useTableMovies} from "@modules/studioPanel/hook/useTableMovies.js";


export const TableMovies = () => {
    const getMoviesStudio = studioStore(state => state.getMoviesStudio);
    const setAllMovies = studioStore(state => state.setAllMovies);
    const hasPermission = studioStore(state => state.hasPermission);
    const {t} = useTranslate();

    const { data: moviesStudio, isLoading } = useQuery({
        queryKey: ['studioMovies'],
        queryFn: getMoviesStudio,
        enabled: !!hasPermission
    })

    const { deleteMovie, updateStatus } = useTableMovies();

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

    const dataMovies = moviesStudio?.map(({isPublished, name, code, createdAt, preview, defaultPreview, video, defaultPreviewWebp, previewWebp}) => ({
        key: code,
        movie: <Preview
            defaultPreviewWebp={defaultPreviewWebp}
            previewWebp={previewWebp}
            video={video}
            defaultPreview={defaultPreview}
            preview={preview}/>,
        name: <NavLink
            className='block hover:underline hover:text-gray-200 max-w-[482px]'
            to={`/studio/edit/${code}`}>{name}</NavLink>,
        date : new Date(createdAt).toLocaleDateString(),
        access: <Select
            suffixIcon={false}
            variant='borderless'
            popupMatchSelectWidth={155}
            defaultValue={isPublished}
            options={[
                { value: true, label: "Опубликовано" },
                { value: false, label: "Не опубликовано" }
            ]}
            onChange={(value) => updateStatus({value, code})}/>,
        delete : <DeleteOutlined style={{ fontSize: "20px", color: "red"}}/>
    }))

    return (
        <ConfigProvider
            renderEmpty={() => (
                <Empty
                    className='p-10'
                    imageStyle={{ height: "auto" }}
                    image={<ExperimentOutlined style={{ fontSize: "100px", color: "rgb(229 231 235)" }} />}
                    description={<p className='text-gray-200 max-w-[400px] mx-auto text-lg'>{t('beta')}</p>}/>
            )}>
            <Table
                rowSelection={{
                    onChange: (_, a) => {
                        const resultCheckedRows = a.map(el => ({ code: el.key }));
                        setAllMovies(resultCheckedRows);
                    }
                }}
                loading={{
                    spinning: isLoading,
                    indicator: <PacmanLoader/>
                }}
                dataSource={dataMovies}
                columns={columns}
                pagination={false}/>
        </ConfigProvider>
    )
}