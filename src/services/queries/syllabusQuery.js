import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_LEARNING_KEY, QUERY_SYLLABUS_KEY } from '../../constants/query';
import { deleteSyllabus, duplicateSyllabus, getAllSyllabus, getLearningObjective, getSyllabus, getSyllabusByID, getSyllabusByOutputStandard, postSyllabus, putSyllabus } from '../Syllabus';

export const useGetObjectiveQuery = () =>
    useQuery({
        queryKey: [QUERY_LEARNING_KEY],
        queryFn: () => getLearningObjective().then((res) => res.data),
        staleTime: 20000,
    },
    );

export const useGetAllSyllabusQuery = () =>
    useQuery({
        queryKey: [QUERY_SYLLABUS_KEY],
        queryFn: () => getAllSyllabus().then((res) => res.data),
        staleTime: 20000,
    },
    );
export const useGetSyllabusQuery = (page, limit, orderby, order) =>
    useQuery({
        queryKey: [QUERY_SYLLABUS_KEY, page, limit, orderby, order],
        queryFn: () => getSyllabus(page, limit, orderby, order).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useSearchSyllabusQuery = (page, search) =>
    useQuery({
        queryKey: [QUERY_SYLLABUS_KEY, page, search],
        queryFn: () => getSyllabus(page, search).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData
    },
    );
export const useGetSyllabusByIdQuery = (id) =>
    useQuery({
        queryKey: [QUERY_SYLLABUS_KEY, "id:" + id],
        queryFn: () => getSyllabusByID(id).then((res) => res.data),
        staleTime: 20000,
        enabled: !!id
    }
    );

export const useGetSyllabusByOutputStandardQuery = (OutputStandard) =>
    useQuery({
        queryKey: [QUERY_SYLLABUS_KEY, "OutputStandard:" + OutputStandard],
        queryFn: () => getSyllabusByOutputStandard(OutputStandard).then((res) => res.data),
        staleTime: 20000,
        enabled: !!OutputStandard
    }
    );
export const usePostSyllabusMutation = () => useMutation({
    mutationFn: postSyllabus
})
export const usePutSyllabusMutation = () => useMutation({
    mutationFn: putSyllabus
})
export const useDeleteSyllabusMutation = () => useMutation({
    mutationFn: deleteSyllabus
})

export const useDuplicateSyllabusMutation = () => useMutation({
    mutationFn: duplicateSyllabus
});

