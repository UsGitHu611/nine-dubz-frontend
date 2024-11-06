import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./react-router/router.jsx";
import "@/lib/i18n/i18n"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {HelmetProvider} from "react-helmet-async"
import {WindowWidthProvider} from "@/context/WindowWidthProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <WindowWidthProvider>
                <RouterProvider router={router}/>
            </WindowWidthProvider>
        </HelmetProvider>
        {/*<ReactQueryDevtools/>*/}
    </QueryClientProvider>
)
