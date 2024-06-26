
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { getAllUser, getClassAdmin, getTrainer, getUser, getUserByID, getUserDashBoard, getUserPermission, postUser, putUser, putUserAvatar, putUserPermission } from '../User';
import { QUERY_PERMISSISON_KEY, QUERY_USER_KEY } from '../../constants/query';

export const useGetUserQuery = (page, limit, orderby, order, debouncedSearchTerm, filter) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, page, limit, orderby, order, debouncedSearchTerm, filter],
        queryFn: () => getUser(page, limit, orderby, order, debouncedSearchTerm, filter).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useGetClassAdminQuery = (bool) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, { roleName: 'Class Admin' }],
        queryFn: () => getClassAdmin().then((res) => res.data),
        staleTime: 20000,
        enabled: bool
    },
    );
export const useGetTrainerQuery = (bool) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, { roleName: 'Trainer' }],
        queryFn: () => getTrainer().then((res) => res.data),
        staleTime: 20000,
        enabled: bool
    },
    );
export const useGetAllUserQuery = (bool) =>
    useQuery({
        queryKey: [QUERY_USER_KEY, { roleName: 'Class Admin' }],
        queryFn: () => getAllUser().then((res) => res.data),
        staleTime: 20000,
        enabled: bool
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
export const useGetUserPermission = () =>
    useQuery({
        queryKey: [QUERY_PERMISSISON_KEY],
        queryFn: () => getUserPermission().then((res) => res.data),
        staleTime: 20000,
    }
    );
export const useGetUserDashboard = () =>
    useQuery({
        queryKey: ["Dashboard", "User"],
        queryFn: () => getUserDashBoard().then((res) => res.data),
        staleTime: 20000,
    }
    );
export const usePostUserMutation = () => useMutation({
    mutationFn: postUser
})
export const usePutUserMutation = () => useMutation({
    mutationFn: putUser
})
export const usePutPermissionMutation = () => useMutation({
    mutationFn: putUserPermission
})
export const usePutUserAvatarMutation = () => useMutation({
    mutationFn: putUserAvatar
})