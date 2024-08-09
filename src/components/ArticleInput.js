import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "@/theme";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { string, func } from "prop-types";

const TEXTS = {
  placeholder: "Paste link or text for bias analysis",
  alert: "Please enter an article",
  cta: "Discover the truth",
  postInNewsFeed: "post report in news feed",
};

export default function AtricleInput({
  article,
  onArticleChange,
  onGetReport,
  isPublished,
  setIsPublished,
}) {
  const handlePublishedChange = (event) => {
    setIsPublished(event.target.checked);
  };

  return (
    <Box style={STYLES.container}>
      <TextField
        id="outlined-multiline-static"
        label={TEXTS.placeholder}
        multiline
        rows={8}
        value={article}
        onChange={onArticleChange}
        sx={STYLES.input}
        InputProps={{ sx: { height: "217px" } }}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            checked={isPublished}
            onChange={handlePublishedChange}
          />
        }
        label={TEXTS.postInNewsFeed}
        sx={STYLES.checkbox}
      />
      <Button
        onClick={onGetReport}
        variant="contained"
        size="large"
        sx={STYLES.button}
      >
        {TEXTS.cta}
      </Button>
    </Box>
  );
}

AtricleInput.propTypes = {
  article: string,
  onArticleChange: func.isRequired,
  onGetReport: func.isRequired,
  isPublished: func.isRequired,
  setIsPublished: func.isRequired,
};

const STYLES = {
  container: {
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(5),
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(0.5),
    height: "217px",
  },
  button: {
    width: "100%",
    height: "72px",
  },
  checkbox: {
    alignSelf: "flex-end",
    marginRight: 0,
  },
};
