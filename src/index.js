import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import 'antd/dist/antd.min.css'
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient} >
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </QueryClientProvider>
);