import apiClient from "./apiClient";
export const getLearningObjective = async () => {
    return await apiClient({
        method: 'get',
        url: `/learning-objectives/all`,
    });
};

export const getAllSyllabus = async () => {
    return await apiClient({
        method: 'get',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus`,
    });
};
export const searchSyllabus = async (page, search) => {
    return await apiClient({
        method: 'get',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus?p=${page + 1}&search=${search}`,
    });
};
export const getSyllabus = async (page, limit, orderBy, order) => {
    return await apiClient({
        method: 'get',
        // url: `/Syllabus?page=1&pageSize=10`,
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus?p=${page + 1}&l=${limit}
        ${order && orderBy ? `&orderby=${orderBy}&order=${order}` : ""}`,
    });
};
export const getSyllabusByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus/${id}`,
    });
};

export const postSyllabus = async ({ syllabusName, code, createdOn, createdBy, duration, outputStandard, status }) => {
    return await apiClient({
        method: 'post',
        // url: `/Syllabus`,
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus`,
        data: {
            syllabusName, code, createdOn, createdBy, duration, outputStandard, status
        },
    });
};
export const putSyllabus = async ({ id, syllabusName, code, createdOn, createdBy, duration, outputStandard, status }) => {
    console.log(id, syllabusName, code, createdOn, createdBy, duration, outputStandard, status)
    return await apiClient({
        method: 'put',
        // url: `/Syllabus`,
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus/${id}`,
        data: {
            syllabusName, code, createdOn, createdBy, duration, outputStandard, status
        },
    });
};
export const deleteSyllabus = async (id) => {
    return await apiClient({
        method: 'delete',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus/${id}`,
    });
};

let duplicateCounter = 1;

export const duplicateSyllabus = async (id) => {
    try {
        const syllabus = await getSyllabusByID(id);
        const currentDate = new Date().toISOString();
        const codeWithoutDuplicate = syllabus.data.code.replace(/\(\d+\)/, '');
        const duplicatedSyllabus = { ...syllabus.data, code: `${codeWithoutDuplicate} (${duplicateCounter++})`, createdOn: currentDate };

        delete duplicatedSyllabus.id;
        const response = await postSyllabus(duplicatedSyllabus);
        return response;
    } catch (error) {
        console.error("Error duplicating syllabus:", error);
        throw error;
    }
};

export const getSyllabusByOutputStandard = async (outputStandard) => {
    return await apiClient({
        method: 'get',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus/${outputStandard}`,
    });
};