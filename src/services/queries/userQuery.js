
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { deleteUser, getAllUser, getUser, getUserByID, getUserPermission, postUser, putUser, putUserPermission } from '../User';
import { QUERY_PERMISSISON_KEY, QUERY_USER_KEY } from '../../constants/query';
export const useGetAllUserQuery = () =>
    useQuery({
        queryKey: [QUERY_USER_KEY],
        queryFn: () => getAllUser().then((res) => res.data),
        staleTime: 20000,
    },
    );
export const useGetUserQuery = (page, limit, orderby, order) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, page, limit, orderby, order],
        queryFn: () => getUser(page, limit, orderby, order).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useSearchUserQuery = (page, search) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, page, search],
        queryFn: () => getUser(page, search).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useGetUserByIdQuery = (id) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, "id:" + id],
        queryFn: () => getUserByID(id).then((res) => res.data),
        staleTime: 20000,
        enabled: !!id
    }
    );
export const useGetUserPermission = (id) =>
    useQuery({
        queryKey: [QUERY_PERMISSISON_KEY],
        queryFn: () => getUserPermission().then((res) => res.data),
        staleTime: 20000,
    }
    );
export const usePostUserMutation = () => useMutation({
    mutationFn: postUser
})
export const usePutUserMutation = () => useMutation({
    mutationFn: putUser
})
export const useDeleteUserMutation = () => useMutation({
    mutationFn: deleteUser
})
export const usePutPermissionMutation = () => useMutation({
    mutationFn: putUserPermission
})
