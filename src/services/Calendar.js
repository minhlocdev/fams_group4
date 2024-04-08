import apiClient from "./apiClient";

export const getCalendar = async (userid) => {
    return await apiClient({
        method: 'get',
        url: `/calendars/by-userid/${userid}`,
    });
};