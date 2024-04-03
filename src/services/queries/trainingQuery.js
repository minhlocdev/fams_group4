import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_PROGRAM_KEY, QUERY_TRAINER_KEY } from "../../constants/query";
import { getAllTrainers, getAllTrainningProgram, getTrainningProgramById } from "../TranningProgram";

export const useGetAllTrainingProgramQuery = () =>
    useQuery({
        queryKey: [QUERY_PROGRAM_KEY],
        queryFn: () => getAllTrainningProgram().then((res) => res.data),
        staleTime: 20000,
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