import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_PROGRAM_KEY, QUERY_TRAINER_KEY } from "../../constants/query";
import { deleteProgram, duplicateProgram, getAllTrainers, getAllTrainningProgram, getTrainningProgramById, postProgram, putProgram, putProgramStatus } from "../TranningProgram";

export const useGetAllTrainingProgramQuery = (isChoosing) =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY],
        queryFn: () => getAllTrainningProgram().then((res) => res.data),
        staleTime: 20000,
        enabled: isChoosing
    },
    );
export const useGetTrainingProgramByIdQuery = (id) =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY, id],
        queryFn: () => getTrainningProgramById(id).then((res) => res.data),
        staleTime: 20000,
        enabled: !!id
    },
    );
export const useGetAllTrainerQuery = () =>
    useQuery({
        queryKey: [QUERY_TRAINER_KEY],
        queryFn: () => getAllTrainers().then((res) => res.data),
        staleTime: 20000,
    },
    );
export const usePostTrainingMutation = () => useMutation({
    mutationFn: postProgram,
    mutationKey: [QUERY_PROGRAM_KEY],
})
export const usePutTrainingMutation = () => useMutation({
    mutationFn: putProgram,
    mutationKey: [QUERY_PROGRAM_KEY],
})
export const usePostDuplicateTrainingMutation = () => useMutation({
    mutationFn: duplicateProgram,
    mutationKey: [QUERY_PROGRAM_KEY],
})
export const usePutTrainingStatusMutation = (id) => useMutation({
    mutationFn: putProgramStatus,
    mutationKey: [QUERY_PROGRAM_KEY, "id:" + id],
})
export const useDeleteProgramMutation = () => useMutation({
    mutationFn: deleteProgram,
})
