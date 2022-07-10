import React, { useState } from "react";
import { debounce } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BookList from "../components/BookList";
import SearchInput from "../components/SearchInput";
import * as api from "../api/books";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  paper: {
    padding: "0px",
    textAlign: "left",
  },
  searchInputPaperLarge: {
    padding: "0px",
    marginBottom: "10px",
    textAlign: "left",
  },
  loadMorePaper: {
    padding: "0px 0px 10px 0px",
    textAlign: "center",
  },
}));

const BooksContainer = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);


  const searchBooks = (keyword) => {
    api
      .getBooks(keyword)
      .then((response) => {
        // console.log(JSON.stringify(response.data.GoodreadsResponse.search[0].results.work))
        const resp = response.data?.GoodreadsResponse?.search[0]?.results[0]?.work
        setBooks(resp ? resp : [])
      })
      .catch((error) => console.log(error));

  };

  const debouncedSearchBooks = debounce(searchBooks, 500);

  const haveBooks = books.length > 0;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item sm={2} />
        <Grid item sm={8}>
          <div className={classes.paper}>
            <Typography>Best Books Search</Typography>
          </div>
        </Grid>
        <Grid item sm={2} />

        <Grid item sm={2} />
        <Grid item sm={8}>
          <Paper className={classes.searchInputPaperLarge}>
            <SearchInput  onSearch={debouncedSearchBooks} />
          </Paper>
          {haveBooks && (
            <Paper className={classes.loadMorePaper}>
              <BookList books={books} />
            </Paper>
          )}
        </Grid>
        <Grid item sm={2} />
      </Grid>
    </div>
  );
};


export default BooksContainer;
