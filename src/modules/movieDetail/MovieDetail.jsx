import { Flex } from "antd";
import { MainContent } from "@modules/movieDetail/components/mainContent/MainContent.jsx";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

export const MovieDetail = () => {
    const { response } = useLoaderData();

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response}>
                { (r) => (
                    <Flex justify='center'>
                        <div className='min-w-[1200px] w-[1200px] p-9 rounded-[20px]'>
                            <MainContent result={r}/>
                        </div>
                    </Flex>
                )
                 }
            </Await>
        </Suspense>
    )
}