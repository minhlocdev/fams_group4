import { paramsToString } from "../utils/paramsToString";
import axios from "axios";
import apiClient from "./apiClient";
const BASE_URL = "https://659d4948633f9aee79091768.mockapi.io/api/v1"

export const getAllTrainningProgram = async () => {
  const params = {
    pageNumber: 1,
    pageSize: 100,
  };
  const queryString = paramsToString(params)
  return await apiClient({
    method: 'get',
    url: `/training-programs?${queryString}`,
  });
};
export const getTrainningProgramById = async (id) => {
  return await apiClient({
    method: 'get',
    url: `/training-programs/${id}`,
  });
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
    url: `/training-programs`,
  });
};

export const getProgram = async (page, limit, orderBy, order, debouncedSearchTerm, filter) => {
  const { startDateBegin, startDateEnd } = filter;
  const params = {
    pageNumber: page + 1,
    pageSize: limit,
    ...(order && orderBy && { sortBy: orderBy, order }),
    ...(debouncedSearchTerm && { searchString: debouncedSearchTerm }),
    ...(startDateBegin && { startDateBegin }),
    ...(startDateEnd && { startDateEnd }),
  };
  const queryString = paramsToString(params)
  return await apiClient({
    method: 'get',
    url: `/training-programs?${queryString}`,
  });
};
export const getProgramByID = async (id) => {
  return await apiClient({
    method: 'get',
    url: `/training-programs/${id}`,
  });
};

export const postProgram = async ({ programName, createdOn, createdBy, duration, status }) => {
  return await apiClient({
    method: 'post',
    // url: `/program`,
    url: `/training-programs`,
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
    url: `/training-programs`,
    data: {
      programName, createdOn, createdBy, duration, status
    },
  });
};
export const deleteProgram = async (id) => {
  return await apiClient({
    method: 'delete',
    url: `/training-programs/${id}`,
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