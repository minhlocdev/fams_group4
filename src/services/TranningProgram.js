import axios from "axios";
import apiClient from "./apiClient";
const BASE_URL = "https://659d4948633f9aee79091768.mockapi.io/api/v1"

export const getAllTrainningProgram = async () => {
  try {
    const program = await axios.get(BASE_URL + `/tranning_program`);
    return program;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? "Unknown Error";
    console.error(msg);
    return false;
  }
};
export const getTrainningProgram = async (id) => {
  try {
    const program = await axios.get(BASE_URL + `/tranning_program?id=${id}`);
    return program;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? "Unknown Error";
    console.error(msg);
    return false;
  }
};

export const getAllTrainers = async () => {
  try {
    const trainer = await axios.get(BASE_URL + `/trainer`);
    return trainer;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? "Unknown Error";
    console.error(msg);
    return false;
  }
};
export const getAllProgram = async () => {
  return await apiClient({
    method: 'get',
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList`,
  });
};
export const getProgram = async (page, limit, orderBy, order) => {
  return await apiClient({
    method: 'get',
    // url: `/program?page=1&pageSize=10`,
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList?p=${page + 1}&l=${limit}
        ${order && orderBy ? `&orderby=${orderBy}&order=${order}` : ""}`,
  });
};
export const getProgramByID = async (id) => {
  return await apiClient({
    method: 'get',
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList/${id}`,
  });
};

export const postProgram = async ({ programName, createdOn, createdBy, duration, status }) => {
  return await apiClient({
    method: 'post',
    // url: `/program`,
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList`,
    data: {
      programName, createdOn, createdBy, duration, status
    },
  });
};
export const putProgram = async ({ id, programName, createdOn, createdBy, duration, status }) => {
  console.log(id, programName, createdOn, createdBy, duration, status)
  return await apiClient({
    method: 'put',
    // url: `/program`,
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList/${id}`,
    data: {
      programName, createdOn, createdBy, duration, status
    },
  });
};
export const deleteProgram = async (id) => {
  return await apiClient({
    method: 'delete',
    url: `https://65d8432ec96fbb24c1bb11b2.mockapi.io/TrainingProgramList/${id}`,
  });
};

let duplicateCounter = 1;

export const duplicateProgram = async (id) => {
  try {
    const Programdup = await getProgramByID(id);
    const currentDate = new Date().toISOString();
    const programNameWithoutDuplicate = Programdup.data.programName.replace(/\(\d+\)/, '');
    const duplicatedProgram = { ...Programdup.data, programName: `${programNameWithoutDuplicate} (${duplicateCounter++})`, createdOn: currentDate };

    delete duplicatedProgram.id;
    const response = await postProgram(duplicatedProgram);
    return response;
  } catch (error) {
    console.error("Error duplicating Program:", error);
    throw error;
  }
};