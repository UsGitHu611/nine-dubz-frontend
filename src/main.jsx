import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./react-router/router.jsx";
import "@/lib/i18n/i18n"
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {ConfigProvider, App} from "antd";
import {components} from "@/assets/js/configStyleUI.js"
import { HelmetProvider } from "react-helmet-async"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <ConfigProvider wave={{disabled: true}} theme={{components}}>
                <App>
                    <RouterProvider router={router}/>
                </App>
            </ConfigProvider>
        </HelmetProvider>
        <ReactQueryDevtools/>
    </QueryClientProvider>
)
