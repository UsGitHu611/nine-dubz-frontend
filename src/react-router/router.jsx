import { createBrowserRouter, defer } from "react-router-dom";
import { Main } from "@pages/main/Main.jsx";
import { Layout } from "@components/layout/Layout.jsx";
import { SignUp } from "@pages/signUp/SignUp";
import { SignIn } from "@pages/signIn/SignIn";
import {Movie} from "@pages/movie/Movie.jsx";
import {NotFound} from "@pages/notFound/NotFound.jsx";
import {Studio} from "@pages/studio/Studio.jsx";
import {EditMovie} from "@pages/editMovie/EditMovie.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element : <Main/>
            },
            {
                path: "/movie/:movieCode",
                element: <Movie/>,
                loader: async ({ params }) => {
                    const { movieCode } = params;
                    const response = fetch(`http://localhost:25565/api/movie/${movieCode}`);
                    return defer({ response: (await response).json()});
                }
            },
            {
                path: "/signup",
                element : <SignUp/>
            },
            {
                path: "/signin",
                element : <SignIn/>
            },
            {
                path: "/studio",
                element : <Studio/>
            },
            {
                path: "/studio/edit/:movieCode",
                element: <EditMovie/>,
                loader: async ({ params }) => {
                    const { movieCode } = params;
                    const response = fetch(`http://localhost:25565/api/movie/user/${movieCode}`,{
                        credentials: "include"
                    });
                    return defer({ response: (await response).json()});
                }
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

