import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            gcTime: 60000 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
});

export default queryClient;
