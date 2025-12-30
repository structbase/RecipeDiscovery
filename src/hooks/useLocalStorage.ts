import { useState } from "react";

// Hook for syncing state with localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
    // Load initial value from localStorage
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Update both state and localStorage
    const setStoredValue = (newValue: T) => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch {
            // Fail silently if localStorage unavailable
        }
    };

    return [value, setStoredValue] as const;
}

export default useLocalStorage;
