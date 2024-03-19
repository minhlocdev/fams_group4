import apiClient from "./apiClient";

export const getAllClass = async () => {
    return await apiClient({
        method: 'get',
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class`,
    });
};

export const getClass = async (page, limit, orderBy, order) => {
    return await apiClient({
        method: 'get',
        // url: `/classes?page=1&pageSize=10`,
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class?p=${page + 1}&l=${limit}
        ${order && orderBy ? `&orderby=${orderBy}&order=${order}` : ""}`,
    });
};

export const getClassByID = async (id) => {
    return await apiClient({
        method: 'get',
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${id}`,
    });
};

export const postClass = async ({ classNames, classCode, createdOn, createdBy, duration, attendee, location, fsu }) => {
    return await apiClient({
        method: 'post',
        // url: `/class`,
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class`,
        data: {
            classNames, classCode, createdOn, createdBy, duration, attendee, location, fsu
        },
    });
};
export const putClass = async ({ id, classNames, classCode, createdOn, createdBy, duration, attendee, location, fsu }) => {
    console.log(id, classNames, classCode, createdOn, createdBy, duration, attendee, location, fsu)
    return await apiClient({
        method: 'put',
        // url: `/class`,
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${id}`,
        data: {
            classNames, classCode, createdOn, createdBy, duration, attendee, location, fsu
        },
    });
};
export const deleteClass = async (id) => {
    return await apiClient({
        method: 'delete',
        url: `https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${id}`,
    });
};

let duplicateCounter = 1;
// 
export const duplicateClass = async (id) => {
  try {
      const classdup = await getClassByID(id); 
      const currentDate = new Date().toISOString();
      const classCodeWithoutDuplicate = classdup.data.classCode.replace(/\(\d+\)/, '');
      const duplicatedClass = { ...classdup.data, classCode: `${classCodeWithoutDuplicate} (${duplicateCounter++})`, createdOn: currentDate };
      
      delete duplicatedClass.id;
      const response = await postClass(duplicatedClass);
      return response;
  } catch (error) {
      console.error("Error duplicating class:", error);
      throw error;
  }
};