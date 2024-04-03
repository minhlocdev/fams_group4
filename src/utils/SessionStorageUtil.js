const SessionStorageUtil = {
    // Get item from session storage
    getItem: (key) => {
        try {
            const serializedItem = sessionStorage.getItem(key);
            return JSON.parse(serializedItem);
        } catch (error) {
            console.error("Error getting item from session storage:", error);
            return null;
        }
    },

    // Set item in session storage
    setItem: (key, value) => {
        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error("Error setting item in session storage:", error);
        }
    },

    // Remove item from session storage
    removeItem: (key) => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing item from session storage:", error);
        }
    },

    // Clear all items from session storage
    clear: () => {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error("Error clearing session storage:", error);
        }
    },
};

export default SessionStorageUtil;
