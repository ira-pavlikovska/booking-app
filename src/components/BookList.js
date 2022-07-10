import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  url: {
    display: "block",
  },
}));

const BookItem = ({ idx, book, classes }) => {
  const text = book.best_book[0].title[0];
  const author = book.best_book[0].author[0].name[0];
  const imageURL = book.best_book[0].image_url[0];
  const selected = idx % 2 === 1;
  return (
    <ListItem
      key={book.id}
      alignItems="flex-start"
      selected={selected}
    >
      <ListItemAvatar>
        <Avatar
          alt="Avatar"
          src={imageURL}
          data-testid="avatar"
        />
      </ListItemAvatar>

      <ListItemText
        primary={`${author}`}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {text}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default function BookList({ books }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {books.map((book, idx) => (
        <BookItem idx={idx} key={idx} book={book} classes={classes} />
      ))}
    </List>
  );
}
