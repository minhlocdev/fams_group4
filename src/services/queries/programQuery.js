import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { deleteProgram, getAllProgram, getProgram, getProgramByID, postProgram, putProgram, duplicateProgram, postImportProgram } from '../TranningProgram';
import { QUERY_PROGRAM_KEY } from '../../constants/query';

export const useGetAllProgramQuery = () =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY],
        queryFn: () => getAllProgram().then((res) => res.data),
        staleTime: 20000,
    },
    );
export const useGetProgramQuery = (page, limit, orderby, order, debouncedSearchTerm, filter) =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY, page, limit, orderby, order, debouncedSearchTerm, filter],
        queryFn: () => getProgram(page, limit, orderby, order, debouncedSearchTerm, filter).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useGetProgramByIdQuery = (id) =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY, "id:" + id],
        queryFn: () => getProgramByID(id).then((res) => res.data),
        staleTime: 20000,
        enabled: !!id
    }
    );
export const usePostProgramMutation = () => useMutation({
    mutationFn: postProgram
})
export const usePutProgramMutation = () => useMutation({
    mutationFn: putProgram
})
export const useDeleteProgramMutation = () => useMutation({
    mutationFn: deleteProgram
})

export const useDuplicateProgramMutation = () => useMutation({
    mutationFn: duplicateProgram
});
export const usePostImportProgramMutation = () => useMutation({
    mutationFn: postImportProgram
})
