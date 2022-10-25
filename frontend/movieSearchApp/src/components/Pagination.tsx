import { Button, TextField } from "@mui/material";
import { IExtendedMovie } from "../interfaces/IMovie";
import "../style/Pagination.css";

interface Props {
  movieList: IExtendedMovie[];
  offset: number;
  currentPage: number;
  setOffset: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

export const Pagination = (props: Props) => {
  return (
    <div className="pageNavigation">
      <Button
        className="prevButton"
        onClick={() => {
          props.setCurrentPage(props.currentPage - 1);
          window.scrollTo(0, 0);
        }}
        variant="contained"
        disabled={props.currentPage > 0 ? false : true}
      >
        &larr; Prev page
      </Button>

      <p className="pageText">Page {props.currentPage + 1}</p>

      <Button
        className="nextButton"
        onClick={() => {
          props.setCurrentPage(props.currentPage + 1);
          window.scrollTo(0, 0);
        }}
        variant="contained"
        //bug: if the last page contains 10 movies, the button is still possible to click on. The user can then open a empty page.
        // not sure how we can fix this. Could be solved if we knew the size of the data list
        disabled={props.movieList.length < 10 ? true : false}
      >
        Next page &rarr;
      </Button>
    </div>
  );
};
