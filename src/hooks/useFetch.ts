import { useState, useEffect } from "react";

// Generic data-fetching hook for API requests
function useFetch<T>(url: string, options?: RequestInit) {
    // Store fetched data, loading state, and any errors
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // AbortController allows us to cancel the request on unmount
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                });

                // Handle non-2xx HTTP responses
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                // Parse and store the response data
                const result = (await response.json()) as T;
                setData(result);
                setError(null);
            } catch (err: unknown) {
                // Ignore abort errors, store all other errors
                if (err instanceof Error && err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                // Always stop loading once the request completes
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup: cancel fetch if component unmounts or dependencies change
        return () => controller.abort();
    }, [url, options]);

    // Expose state to consuming components
    return { data, loading, error };
}

export default useFetch;
