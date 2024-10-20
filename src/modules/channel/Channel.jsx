import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

export const Channel = () => {
    const { response } = useLoaderData();

    return (
        <Suspense fallback={<h3>Загрузка</h3>}>
            <Await resolve={response}>
                { (va) => {
                    console.log(va)
                    return (
                        <div>
                            a
                        </div>
                    )
                } }
            </Await>
        </Suspense>
    )
}