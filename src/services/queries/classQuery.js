import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { deleteClass, getAllClass, getClass, getClassByID, postClass, putClass, duplicateClass } from '../Class';
import { QUERY_CLASS_KEY } from '../../constants/query';

export const useGetAllClassQuery = () =>
    useQuery({
        queryKey: [QUERY_CLASS_KEY],
        queryFn: () => getAllClass().then((res) => res.data),
        staleTime: 20000,
    },
    );
export const useGetClassQuery = (page, limit, orderby, order) =>
    useQuery({
        queryKey: [QUERY_CLASS_KEY, page, limit, orderby, order],
        queryFn: () => getClass(page, limit, orderby, order).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useGetClassByIdQuery = (id) =>
    useQuery({
        queryKey: [QUERY_CLASS_KEY, "id:" + id],
        queryFn: () => getClassByID(id).then((res) => res.data),
        staleTime: 20000,
        enabled: !!id
    }
    );
export const usePostClassMutation = () => useMutation({
    mutationFn: postClass
})
export const usePutClassMutation = () => useMutation({
    mutationFn: putClass
})
export const useDeleteClassMutation = () => useMutation({
    mutationFn: deleteClass
})

export const useDuplicateClassMutation = () => useMutation({
    mutationFn: duplicateClass
});