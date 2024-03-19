import React, { useState } from "react";
import { InputBoxSearch } from "../../shared/InputBox/InputBox";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../utils/useDebouce";

export default function SearchUser() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [page, setPage] = useState(Number(searchParams.get("p")) || 0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  return <InputBoxSearch search={search} setSearch={setSearch} />;
}
