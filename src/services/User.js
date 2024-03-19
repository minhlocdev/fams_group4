import apiClient from "./apiClient";

export const getAllUser = async () => {
    return await apiClient({
        method: 'get',
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users`,
    });
};
export const searchUser = async (page, search) => {
    return await apiClient({
        method: 'get',
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users?p=${page + 1}&search=${search}`,
    });
};

export const getUser = async (page, limit, orderBy, order) => {
    return await apiClient({
        method: 'get',
        // url: `/users?page=1&pageSize=10`,
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users?p=${page + 1}&l=${limit}
        ${order && orderBy ? `&orderby=${orderBy}&order=${order}` : ""}`,
        // url: `/users?page=1&pageSize=10`,
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users?p=${page + 1}&l=${limit}
        ${order && orderBy ? `&orderby=${orderBy}&order=${order}` : ""}`,
    });
};
export const getUserByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users/${id}`,
    });
};

export const postUser = async ({ name, email, dateOfBirth, phone, gender, status, permissionId }) => {
    return await apiClient({
        method: 'post',
        // url: `/user`,
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users`,
        data: {
            name, email, dateOfBirth, phone, gender, status, permissionId
        },
    });
};
export const putUser = async ({ id, name, email, dateOfBirth, phone, gender, status, permissionId }) => {
    console.log(id, name, email, dateOfBirth, phone, gender, status, permissionId)
    return await apiClient({
        method: 'put',
        // url: `/user`,
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users/${id}`,
        data: {
            name, email, dateOfBirth, phone, gender, status, permissionId
        },
    });
};
export const deleteUser = async (id) => {
    return await apiClient({
        method: 'delete',
        url: `https://65de1e0bdccfcd562f5650fe.mockapi.io/users/${id}`,
    });
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
