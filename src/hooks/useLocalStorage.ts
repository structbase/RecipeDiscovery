import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    // Initialize state from localStorage (if available)
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Update state + localStorage together
    const setStoredValue = (newValue: T) => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch {
            // fail silently (localStorage can be unavailable)
        }
    };

    return [value, setStoredValue] as const;
}

export default useLocalStorage;
