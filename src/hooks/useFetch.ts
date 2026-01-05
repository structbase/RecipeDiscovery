import { useState, useEffect } from "react";

// Generic data-fetching hook for API requests
function useFetch<T>(url?: string | null, options?: RequestInit) {
    // Store fetched data, loading state, and any errors
    // Must be called unconditionally to follow React hooks rules
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // When no URL is provided, skip fetching and return idle state
        if (!url) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        // AbortController allows us to cancel the request on unmount
        const controller = new AbortController();
        let mounted = true;

        const fetchData = async () => {
            if (!mounted) return;
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
                if (!mounted) return;
                setData(result);
                setError(null);
            } catch (err: unknown) {
                // Ignore abort errors, store all other errors
                if (err instanceof Error && err.name !== "AbortError") {
                    if (mounted) setError(err);
                }
            } finally {
                // Always stop loading once the request completes
                if (mounted) setLoading(false);
            }
        };

        fetchData();

        // Cleanup: cancel fetch and mark unmounted to avoid state updates
        return () => {
            mounted = false;
            controller.abort();
        };
    }, [url, options]);

    // Expose state to consuming components
    return { data, loading, error };
}

export default useFetch;
