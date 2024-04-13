import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { deleteClass, getClass, getClassByID, postClass, putClass, duplicateClass, changeStatusClass } from '../Class';
import { QUERY_CLASS_KEY } from '../../constants/query';

export const useGetClassQuery = (page, limit, orderby, order, debouncedSearchTerm,
    filter) =>
    useQuery({
        queryKey: [QUERY_CLASS_KEY, page, limit, orderby, order, debouncedSearchTerm,
            filter],
        queryFn: () => getClass(page, limit, orderby, order, debouncedSearchTerm,
            filter).then((res) => res.data),
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
export const useChangeStatusClassMutation = () => useMutation({
    mutationFn: changeStatusClass
});