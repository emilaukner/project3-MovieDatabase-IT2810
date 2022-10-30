import React, { useEffect, useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "../style/SearchBar.css";
import { makeVar, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_SEARCHES } from "../queries/createSearches";
import { GET_SEARCHES } from "../queries/getSearches";

export const titleSearchedFor = makeVar<string>("");

export default function SearchBar() {
  const [search, setSearch] = useState(titleSearchedFor());
  const [addSearch, { data, loading, error }] = useMutation(CREATE_SEARCHES, {
    refetchQueries: [{ query: GET_SEARCHES }],
  });

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSubmit = () => {
    titleSearchedFor(search.trim());
    if (search.trim()) {
      addSearch({
        variables: {
          title: search,
        },
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      titleSearchedFor(search.trim());
    }
  };

  if (loading) return <p>Saving search ...</p>;
  if (error) return <p>Could not save search ...</p>;

  return (
    <div className="searchBar">
      <TextField
        className="searchInput"
        placeholder="Enter the title of your movie ..."
        label="Title of movie"
        variant="filled"
        type="text"
        onChange={onChangeSearch}
        onKeyDown={handleKeyDown}
        value={search}
      />
      <IconButton className="searchButton" onClick={onSubmit}>
        <SearchIcon />
        Search
      </IconButton>
    </div>
  );
}
