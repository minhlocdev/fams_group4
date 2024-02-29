import axios from "axios";
import { BASE_URL } from "../constants/API";

export const getAllTrainningProgram = async () => {
    try {
        const program = await axios.get(BASE_URL + `/tranning_program`);
        return program;

    } catch (e) {
        const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
        console.error(msg);
        return false;
    }
};
export const getTrainningProgram = async (id) => {
    try {
        const program = await axios.get(BASE_URL + `/tranning_program?id=${id}`);
        return program;

    } catch (e) {
        const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
        console.error(msg);
        return false;
    }
};

export const getAllTrainers = async () => {
    try {
        const trainer = await axios.get(BASE_URL + `/trainer`);
        return trainer;

    } catch (e) {
        const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
        console.error(msg);
        return false;
    }
};
