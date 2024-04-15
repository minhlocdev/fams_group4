import { paramsToString } from "../utils/paramsToString";
import apiClient from "./apiClient";


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

export const postProgram = async ({ name, userId, startTime, duration, topicCode, status, createdBy, classIds, syllabusDTOs }) => {
  return await apiClient({
    method: 'post',
    url: `/training-programs`,
    data: {
      name, userId, startTime, duration, topicCode, status, createdBy, classIds, syllabusDTOs
    },
  });
};
export const putProgram = async ({ trainingProgramCode, name, userId, startTime, duration, topicCode, status, trainingProgramSyllabus }) => {
  return await apiClient({
    method: 'put',
    url: `/training-programs`,
    data: {
      trainingProgramCode, name, userId, startTime, duration, topicCode, status, trainingProgramSyllabus
    },
  });
};
export const putProgramStatus = async ({ id, status }) => {
  return await apiClient({
    method: 'put',
    url: `/training-programs/${id}/change-status?status=${status}`,
  });
};


export const deleteProgram = async (id) => {
  return await apiClient({
    method: 'delete',
    url: `/training-programs/${id}`,
  });
};

export const duplicateProgram = async (id) => {
  return await apiClient({
    method: 'post',
    url: `/training-programs/${id}/duplicate-training-program`,
  });
};

export const postImportProgram = async ({ userId, importType, scan, file }) => {
  const params = {
    userId: Number(userId),
    importType: importType,
    scan: scan
  };

  const queryString = paramsToString(params);

  const formData = new FormData();
  formData.append("file", file);
  return await apiClient({
    method: 'post',
    headers: { Accept: "*/*", "Content-Type": "multipart/form-data" },
    url: `/importExcel?${queryString}`,
    data: formData,
    file: formData
  });
};
