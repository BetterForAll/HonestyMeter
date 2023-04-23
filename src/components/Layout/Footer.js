import React from "react";
import { Box, Typography } from '@mui/material';
import Link from 'next/link';;
import ContactIcon from "../ContactIcon";
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_URL, PAGE_LABELS, PAGE_ROUTES } from "@/constants/constants";
import theme from "@/theme";
import { EMPTY_FUNCTION } from "@/utils/utils";
import { func, number } from 'prop-types';

export default function Footer({ setCurrentPage = EMPTY_FUNCTION, closeReport }) {
  return (
    <Box sx={STYLES.container}>
      {
        PAGE_LABELS.map((pageLabel, pageIndex) => {
          return (
            <BottomNavTextLink
              pageIndex={pageIndex}
              setCurrentPage={setCurrentPage}
              closeReport={closeReport}
              key={pageLabel}
            />
          )
        })
      }
      <Box sx={STYLES.flexCenter}>
        <ContactIcon />
        <Link href={GITHUB_URL} target='_blank' rel='noopener noreferrer' style={STYLES.flexCenter}>
          <GitHubIcon sx={STYLES.githubIcon} />
        </Link>
      </Box>
    </Box>
  )
}

Footer.propTypes = {
  setCurrentPage: func,
  closeReport: func
}

function BottomNavTextLink({ pageIndex, setCurrentPage, closeReport }) {

  const handleClick = () => {
    if (pageIndex === 0) {
      closeReport();
    }

    setCurrentPage(pageIndex)
  }

  return (
    <Link
      href={PAGE_ROUTES[pageIndex]}
      style={STYLES.textLink}
      onClick={handleClick} >{
        <Typography sx={STYLES.textLink}>
          {PAGE_LABELS[pageIndex]}
        </Typography>
      }</Link>
  )
}

BottomNavTextLink.propTypes = {
  pageIndex: number,
  setCurrentPage: func,
  closeReport: func
}

const STYLES = {
  container: {
    width: '100%',
    maxWidth: '1000px',
    height: '128px',
    margin: theme.spacing(0, 1),
    padding: theme.spacing(7, 1),
    display: 'flex',
    gap: theme.spacing(4),
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '0 auto'
  },
  textLink: {
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main
    },
  },
  githubIcon: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main
    },
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2)
  }
}
