import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useDebounce from './useDebouce';

const useTable = (defaultPage = 0, defaultRowsPerPage = 10) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const isEdit = location.pathname.includes('edit');
    const isCreate = location.pathname.includes('create');
    const isDetail = location.pathname.includes('detail');

    const params = useMemo(() => {
        return new URLSearchParams(searchParams.toString())
    }, [searchParams]);
    const [page, setPage] = useState(Number(params.get("p")) || defaultPage);
    const [rowsPerPage, setRowsPerPage] = useState(
        Number(params.get("l")) || defaultRowsPerPage
    );

    const handleSortChange = (sort) => {
        params.set("orderby", sort.item);
        params.set("order", sort.dir);
        setSearchParams(params);
    };

    const orderBy = params.get("orderby");
    const order = params.get("order");

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        setPage(newPage);
        params.set("p", newPage);
        setSearchParams(params);
    };

    const search = params.has("search") ? params.get("search") : "";
    const debouncedSearchTerm = useDebounce(search, 500);
    useEffect(() => {
        if (!isEdit && !isCreate && !isDetail) {
            setPage(0);
            params.set("p", 0);
            setSearchParams(params);
        }
        // eslint-disable-next-line
    }, [debouncedSearchTerm, isEdit, isCreate, isDetail]);
    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        params.set("p", 0);
        params.set("l", newRowsPerPage);
        setSearchParams(params);
    };

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        orderBy,
        order,
        debouncedSearchTerm,
        handleSortChange,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};

export default useTable;
