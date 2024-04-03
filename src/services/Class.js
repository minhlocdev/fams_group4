import apiClient from "./apiClient";
import { paramsToString } from "../utils/paramsToString";

export const getClass = async (page, limit, orderBy, order, debouncedSearchTerm, filter) => {
    const { locations, startDate, endDate, status, typeClassTime, FSU, trainerId, attendees } = filter;
    const params = {
        PageNumber: page + 1,
        PageSize: limit,
        ...(order && orderBy && { sortBy: orderBy, order }),
        ...(debouncedSearchTerm && { searchString: debouncedSearchTerm }),
        ...(locations && { locations }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
        ...(typeClassTime && { typeClassTime }),
        ...(FSU && { FSU }),
        ...(trainerId && { trainerId }),
        ...(attendees && { attendees }),
    };
    const queryString = paramsToString(params)
    return await apiClient({
        method: 'get',
        url: `/classes?${queryString}`,
    });
};

export const getClassByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `/classes/${id}`,
    });
};

export const postClass = async (data) => {
    return await apiClient({
        method: 'post',
        url: `/classes`,
        data,
    });
};
export const putClass = async (data) => {
    return await apiClient({
        method: 'put',
        url: `/classes`,
        data,
    });
};
export const deleteClass = async (id) => {
    return await apiClient({
        method: 'delete',
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${id}`,
    });
};

let duplicateCounter = 1;
// 
export const duplicateClass = async (id) => {
    try {
        const classdup = await getClassByID(id);
        const currentDate = new Date().toISOString();
        const classCodeWithoutDuplicate = classdup.data.classCode.replace(/\(\d+\)/, '');
        const duplicatedClass = { ...classdup.data, classCode: `${classCodeWithoutDuplicate} (${duplicateCounter++})`, createdOn: currentDate };

        delete duplicatedClass.id;
        const response = await postClass(duplicatedClass);
        return response;
    } catch (error) {
        console.error("Error duplicating class:", error);
        throw error;
    }
};