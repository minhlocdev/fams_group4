import { fileDB, getPathStorageFromUrl } from "../utils/FireBase";
import { paramsToString } from "../utils/paramsToString";
import apiClient from "./apiClient";
import {
    ref,
    deleteObject,
} from "firebase/storage";
export const getSyllabusOutline = async (id) => {
    return await apiClient({
        method: 'get',
        url: `syllabuses/outline/${id}`,
    });
}
export const getLearningObjective = async () => {
    return await apiClient({
        method: 'get',
        url: `/learning-objectives/all`,
    });
};

export const getAllSyllabus = async () => {
    return await apiClient({
        method: 'get',
        url: `/syllabuses`,
    });
};

export const getAllSyllabusActive = async () => {
    return await apiClient({
        method: 'get',
        url: `/syllabuses/all-active`,
    });
};

export const getSyllabus = async (page, limit, orderBy, order, debouncedSearchTerm, filter) => {
    const { outputStandardStrings, createdDateBegin, createdDateEnd } = filter;
    const params = {
        PageNumber: page + 1,
        PageSize: limit,
        ...(order && orderBy && { sortBy: orderBy, order }),
        ...(debouncedSearchTerm && { searchString: debouncedSearchTerm }),
        ...(outputStandardStrings && { outputStandardStrings }),
        ...(createdDateBegin && { createdDateBegin }),
        ...(createdDateEnd && { createdDateEnd }),
    };
    const queryString = paramsToString(params)
    return await apiClient({
        method: 'get',
        url: `/syllabuses?${queryString}`,
    });
};
export const getSyllabusByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `/syllabuses/${id}`,
    });
};

export const postSyllabus = async ({ generalTab, dayUnits, otherScreen }) => {
    return await apiClient({
        method: 'post',
        // url: `/Syllabus`,
        url: `/syllabus/create-syllabus`,
        data: {
            generalTab, dayUnits, otherScreen
        },
    });
};
export const putSyllabus = async ({ id,
    syllabusName,
    technicalRequirement,
    attendeeNumber,
    courseObjective,
    trainingPrinciples,
    level,
    modifiedBy,
    outputStandards,
    schema,
    outline,
    deletingFiles }) => {
    return await apiClient({
        method: 'put',
        url: `/syllabus`,
        data:
        {
            id,
            syllabusName,
            technicalRequirement,
            attendeeNumber,
            courseObjective,
            trainingPrinciples,
            level,
            modifiedBy,
            outputStandards,
            schema,
            outline
        }
        ,
    }).then(async () => {
        for (const file of deletingFiles) {
            const storageRef = ref(fileDB, getPathStorageFromUrl(file.url));
            await deleteObject(storageRef).catch(e => console.log("Error at deleting file on firebase ", e))
        }
    });
};
export const ChangeSyllabusStausByID = async ({ id, status }) => {
    return await apiClient({
        method: 'put',
        url: `/syllabuses/${id}/change-status?status=${status}`,
    })
}
export const deleteSyllabus = async (id) => {
    return await apiClient({
        method: 'delete',
        url: `/syllabuses/${id}`,
    });
};



export const duplicateSyllabus = async (id) => {
    return await apiClient({
        method: 'post',
        url: `/syllabuses/duplicate-syllabus/${id}`
    })
};

export const getSyllabusByOutputStandard = async (outputStandard) => {
    return await apiClient({
        method: 'get',
        url: `https://65e14c98d3db23f7624ab97a.mockapi.io/Syllabus/${outputStandard}`,
    });
};

export const getTimeAllocationByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `/syllabuses/time-allocation/${id}`,
    });
};

export const postImportSyllabus = async ({ userId, importType, scan, file }) => {
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
        url: `/syllabuses/import-excel?${queryString}`,
        data: formData,
        file: formData
    });
};
