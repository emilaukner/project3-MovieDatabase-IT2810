import { useState } from "react";
import SearchBar, { titleSearchedFor } from "./SearchBar";
import "../style/MovieSearch.css";
import SearchByTitle from "./SearchByTitle";
import GetAllMovies from "./GetAllMovies";
import SearchByGenre from "./SearchByGenre";
import SearchByTitleAndGenre from "./SearchByTitleAndGenre";
import FilterGenre from "./FilterGenre";
import SortByAttribute from "./SortByAttribute";
import { useReactiveVar } from "@apollo/client";
import DisplaySearches from "./DisplaySearches";
import HistoryIcon from "@mui/icons-material/History";
import { Box, IconButton } from "@mui/material";

function MovieSearch() {
  const [showSearches, setShowSearches] = useState(false);
  const [genre, setGenre] = useState<string>("");
  const [sortingDirection, setSortingDirection] = useState<string>("DESC");
  const title = useReactiveVar(titleSearchedFor);

  function setQuery() {
    if (title && !genre) {
      return <SearchByTitle sortingDirection={sortingDirection} />;
    } else if (!title && genre) {
      return (
        <SearchByGenre sortingDirection={sortingDirection} genre={genre} />
      );
    } else if (title && genre) {
      return (
        <SearchByTitleAndGenre
          genre={genre}
          sortingDirection={sortingDirection}
        />
      );
    } else {
      return <GetAllMovies sortingDirection={sortingDirection} />;
    }
  }

  const onSubmit = () => {
    setShowSearches(!showSearches);
  };

  return (
    <div className="movieSearchContainer">
      {showSearches ? (
        <>
          <Box display="flex" justifyContent="center">
            <IconButton
              color="primary"
              className="showSearchesButton"
              onClick={onSubmit}
            >
              <HistoryIcon />
              {showSearches ? "Hide search log" : "Show search log"}
            </IconButton>
          </Box>
          <DisplaySearches setShowSearches={setShowSearches} />
        </>
      ) : (
        <div>
          <SearchBar />
          <div className="filterAndSortContainer">
            <FilterGenre genre={genre} setGenre={setGenre} />
            <SortByAttribute
              sortingDirection={sortingDirection}
              setSortingDirection={setSortingDirection}
            />
          </div>
          <Box display="flex" justifyContent="center">
            <IconButton
              color="primary"
              className="showSearchesButton"
              onClick={onSubmit}
            >
              <HistoryIcon />
              {showSearches ? "Hide search log" : "Show search log"}
            </IconButton>
          </Box>
          {setQuery()}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
