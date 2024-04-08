import { paramsToString } from "../utils/paramsToString";
import apiClient from "./apiClient";

export const getUser = async (page, limit, orderBy, order, debouncedSearchTerm, filter) => {
    const { roleName, gender, dobFro, dobTo } = filter;
    const params = {
        pageNumber: page + 1,
        pageSize: limit,
        ...(order && orderBy && { sortBy: orderBy, order }),
        ...(debouncedSearchTerm && { searchInput: debouncedSearchTerm }),
        ...(roleName && { roleName }),
        ...(gender && { gender }),
        ...(dobFro && { dobFro }),
        ...(dobTo && { dobTo }),
    };
    const queryString = paramsToString(params)
    return await apiClient({
        method: 'get',
        url: `/users?${queryString}`,
    });
};
export const getUserByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `/users/${id}`,
    });
};

export const postUser = async ({ name, email, dateOfBirth, phone, gender, status, rolename }) => {
    return await apiClient({
        method: 'post',
        url: `/users`,
        data: {
            name, email, dateOfBirth, phone, gender, status, rolename
        },
    });
};
export const putUser = async ({ id, name, email, dateOfBirth, phone, gender, status, rolename }) => {
    return await apiClient({
        method: 'put',
        url: `/users`,
        data: {
            id, name, email, dateOfBirth, phone, gender, status, rolename
        },
    });
};
export const getLoginUser = async (token) => {
    return await apiClient({
        method: 'get',
        url: `/login/user?token=${token}`,
    })
};
export const postLoginUser = async ({ email, password }) => {
    return await apiClient({
        method: 'post',
        url: `/login`,
        data: { email, password }
    });
}; export const getUserPermission = async () => {
    return await apiClient({
        method: 'get',
        url: `/user-permissions`,
    });
};
export const putUserPermission = async (permissionData) => {
    return await apiClient({
        method: 'put',
        url: `/user-permissions/update`,
        data: permissionData
    });
};
export const putUserAvatar = async ({ id, link }) => {
    return await apiClient({
        headers: {
            "Content-Type": "application/json"
        },
        method: 'put',
        url: `/users/change-avatar/${id}`,
        data: `${link}`
    });
};