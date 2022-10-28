import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { IExtendedMovie, IMovie } from "../interfaces/IMovie";
import { GET_ALL_MOVIES, GET_MOVIES_BY_TITLE } from "../queries/getMovies";
import SearchBar, { titleSearchedFor } from "./SearchBar";
import "../style/MovieSearch.css";
import { Box, Button } from "@mui/material";
import { Pagination } from "./Pagination";
import { E } from "../enum";
import { DisplayMovies } from "./DisplayMovies";
import DisplaySearches from "./DisplaySearches";

function MovieSearch() {
  const [showSearches, setShowSearches] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 5;
  let loadedMoviesList: IExtendedMovie[] = [];
  const title = useReactiveVar(titleSearchedFor);

  // If a new title is searched for, set the the current page to zero.
  useEffect(() => {
    setCurrentPage(0);
  }, [title]);

  function titleIsEmpty() {
    return title == "";
  }

  // If titleIsEmpty, load all movies. If the title is not empty, load the movies with the stirng it is searched for
  const { loading, error, data } = useQuery(
    titleIsEmpty() ? GET_ALL_MOVIES : GET_MOVIES_BY_TITLE,
    {
      variables: titleIsEmpty()
        ? {
            offset: currentPage * E.PAGE_SIZE,
            limit: E.PAGE_SIZE,
          }
        : {
            searchString: title,
            offset: currentPage * E.PAGE_SIZE,
            limit: E.PAGE_SIZE,
          },
    }
  );

  if (loading) return <p>Loading data ...</p>;
  if (error) return <p>Could not load movies ...</p>;

  // Add the offset to the list which is showing the movies
  if (titleIsEmpty()) {
    data.movies.map((movie: IExtendedMovie) => {
      loadedMoviesList.push(movie);
    });
  } else {
    data.findMovieByTitle.map((movie: IExtendedMovie) => {
      loadedMoviesList.push(movie);
    });
  }

  const onSubmit = () => {
    setShowSearches(!showSearches);
  };

  return (
    <div>
      <Button onClick={onSubmit}>
        {showSearches ? "Hide searches" : "Show searches"}
      </Button>
      {showSearches ? (
        <DisplaySearches />
      ) : (
        <>
          <SearchBar />
          <Box className="movieList">
            <DisplayMovies movieList={loadedMoviesList} />
          </Box>
          <Pagination
            movieList={loadedMoviesList}
            offset={offset}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default MovieSearch;
