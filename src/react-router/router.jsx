import { createBrowserRouter, defer } from "react-router-dom";
import { Main } from "@pages/main/Main.jsx";
import { Layout } from "@components/layout/Layout.jsx";
import {Movie} from "@pages/movie/Movie.jsx";
import {NotFound} from "@pages/notFound/NotFound.jsx";
import {EditMovie} from "@pages/editMovie/EditMovie.jsx";
import {lazy, Suspense} from "react";


const SignUp = lazy(() => import('@pages/signUp/SignUp'));
const SignIn = lazy(() => import('@pages/signIn/SignIn'));
const Studio = lazy(() => import('@pages/studio/Studio.jsx'));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '*',
                element: <NotFound/>,
            },
            {
                path: "/",
                element : <Main/>
            },
            {
                path: "/movie/:movieCode",
                element: <Movie/>,
                loader: async ({ params }) => {
                    const { movieCode } = params;
                    const response = fetch(`${import.meta.env.VITE_DEV_URL}/api/movie/${movieCode}`, {
                        credentials : "include"
                    });
                    return defer({ response: (await response).json()})
                }
            },
            {
                path: "/signup",
                element : (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <SignUp/>
                    </Suspense>
                )
            },
            {
                path: "/signin",
                element : (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <SignIn/>
                    </Suspense>
                )
            },
            {
                path: "/studio",
                element : (
                    <Suspense fallback={<h1>Loading</h1>}>
                        <Studio/>
                    </Suspense>
                )
            },
            {
                path: "/studio/edit/:movieCode",
                element: <EditMovie/>,
                loader: async ({ params }) => {
                    const { movieCode } = params;
                    const response = fetch(`${import.meta.env.VITE_DEV_URL}/api/movie/user/${movieCode}`,{
                        credentials: "include"
                    });
                    return defer({ response: (await response).json()});
                }
            }
        ]
    }
])

