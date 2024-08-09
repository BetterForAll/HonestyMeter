import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "@/theme";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

import { string, func } from "prop-types";
import { WOLRD_NEWS_API_URL } from "@/constants/constants";

const Spacer = <Box sx={{ height: { xs: theme.spacing(2), sm: "42px" } }} />;

const TEXTS = {
  placeholder: "Paste link or text for bias analysis",
  alert: "Please enter an article",
  cta: "Discover the truth",
  postInNewsFeed: "post report in news feed",
  articleTextExtracted: "text extraction by url powered by",
  worldNewsApi: "world news api",
};

export default function AtricleInput({
  article,
  onArticleChange,
  onGetReport,
  isPublished,
  setIsPublished,
  isPublishEnabled,
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

      {isPublishEnabled ? (
        <Box sx={STYLES.checkBoxContainer}>
          <Typography sx={STYLES.articleTextExtracted}>
            {TEXTS.articleTextExtracted}
            &nbsp;
            <a href={WOLRD_NEWS_API_URL} target="_blank" rel="noreferrer">
              {TEXTS.worldNewsApi}
            </a>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                checked={isPublished}
                onChange={handlePublishedChange}
                size="small"
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize * 0.75,
                  color: theme.palette.text.secondary,
                }}
              >
                {TEXTS.postInNewsFeed}
              </Typography>
            }
            sx={STYLES.checkbox}
          />
        </Box>
      ) : (
        Spacer
      )}
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
  checkBoxContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(0.5),
    flexWrap: "wrap",
  },
  checkbox: {
    width: { xs: "100%", sm: "auto" },
    alignSelf: "flex-end",
    marginRight: 0,
    display: "flex",
    justifyContent: "center",
  },
  articleTextExtracted: {
    textAlign: "center",
    marginTop: theme.spacing(0),
    fontSize: theme.typography.fontSize * 0.75,
    color: theme.palette.text.secondary,
    " & a": {
      color: theme.palette.text.secondary,
    },
    width: { xs: "100%", sm: "auto" },
  },
};
