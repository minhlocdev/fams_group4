export const HandleSortTPID = (datas, sortOrder, setSortOrder, setDatas) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) => a.id - b.id);
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) => b.id - a.id);
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};
export const handleSortTPName = (datas, sortOrder, setSortOrder, setDatas) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) =>
      a.programName.localeCompare(b.programName),
    );
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) =>
      b.programName.localeCompare(a.programName),
    );
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};

export const handleSorTPCreatedOn = (
  datas,
  sortOrder,
  setSortOrder,
  setDatas,
) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) => {
      const dateA = new Date(a.createdOn.split("/").reverse().join("-"));
      const dateB = new Date(b.createdOn.split("/").reverse().join("-"));
      return dateA - dateB;
    });
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) => {
      const dateA = new Date(a.createdOn.split("/").reverse().join("-"));
      const dateB = new Date(b.createdOn.split("/").reverse().join("-"));
      return dateB - dateA;
    });
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};

export const handleSortTPCreatedBy = (
  datas,
  sortOrder,
  setSortOrder,
  setDatas,
) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) => a.createdBy.localeCompare(b.createdBy));
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) => b.createdBy.localeCompare(a.createdBy));
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};

export const HandleSortTPDuration = (
  datas,
  sortOrder,
  setSortOrder,
  setDatas,
) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) => a.duration - b.duration);
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) => b.duration - a.duration);
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};

export const handleSortTPStatus = (
  datas,
  sortOrder,
  setSortOrder,
  setDatas,
) => {
  let sortedData;
  if (sortOrder === "asc") {
    // Sắp xếp tăng dần
    sortedData = datas.sort((a, b) => {
      const statusOrder = {
        Active: 0,
        Draft: 1,
        Inactive: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    setSortOrder("desc");
  } else {
    // Sắp xếp giảm dần
    sortedData = datas.sort((a, b) => {
      const statusOrder = {
        Active: 0,
        Draft: 1,
        Inactive: 2,
      };
      return statusOrder[b.status] - statusOrder[a.status];
    });
    setSortOrder("asc");
  }
  setDatas([...sortedData]);
};
