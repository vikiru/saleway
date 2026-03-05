import { QueryClient } from '@tanstack/react-query';

export function getServerQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    });
}
