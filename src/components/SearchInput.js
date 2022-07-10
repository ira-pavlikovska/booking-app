import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

import InputAdornment from "@material-ui/core/InputAdornment";

const styles = ({ palette }) => ({
  root: {
    margin: 0,
    width: "100%",
  },
  inputRoot: {
    margin: "0 !important",
    borderRadius: "4px",
  },
  input: {
    border: "unset",
  },
  searchIcon: {
    color: palette.primary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const SearchInput = ({ classes, onSearch, keyword = "" }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(keyword);
  }, []);

  const handleKeyUp = () => onSearch(value);

  return (
    <TextField
      className={classes.root}
      InputProps={{
        classes: { root: classes.inputRoot, input: classes.input },
        startAdornment: (
          <InputAdornment position="start" onClick={() => onSearch(value)}>
            <SearchIcon
              className={classnames({
                [classes.searchIcon]: true,
              })}
            />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      type="search"
      placeholder="Search by author or title"
      value={value}
      onKeyUp={handleKeyUp}
      onChange={(e) => {
        setValue(e.target.value);
        // handle click on x-icon
        if (e.target.value === "") onSearch(e.target.value);
      }}
    />
  );
};

export default withStyles(styles)(SearchInput);
