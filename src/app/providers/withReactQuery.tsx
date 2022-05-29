import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Loader from "../../common/Loader";

const queryClient = new QueryClient();

export const withReactQuery = (component: () => React.ReactNode) => () =>
    (
        <QueryClientProvider client={queryClient}>
            <React.Suspense fallback={<Loader />}>{component()}</React.Suspense>
        </QueryClientProvider>
    );
