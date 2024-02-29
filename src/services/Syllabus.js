import axios from "axios";
import { BASE_URL } from "../constants/API";
// chỉ test url thoi nha
export const getAllSyllabus = async () => {
    try {
        const program = await axios.get(`https://65dee4b6ff5e305f32a0cb1e.mockapi.io/syllabus`);
        console.log(program)
        return program.data;

    } catch (e) {
        const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
        console.error(msg);
        return false;
    }
};