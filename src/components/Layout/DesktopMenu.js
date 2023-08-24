import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import ContactIcon from '@/components/ContactIcon';
import theme from '@/theme';
import { GITHUB_URL, PAGE_LABELS } from '@/constants/constants';
import { number, func, arrayOf, string } from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';

export default function Menu({ currentPage, setCurrentPage, pageRoutes }) {
  const router = useRouter();

  const handleChange = (_, pageIndex) => {
    setCurrentPage(pageIndex);
    const pageToPush = pageRoutes[pageIndex];

    console.log({ pageToPush });
    router.push('/' + pageToPush);
  };

  return (
    <Box sx={STYLES.visibilityBlockContainer}>
      <Box style={{ ...STYLES.flexContainer, ...STYLES.flexCenter }}>
        <Box sx={STYLES.tabsContainer}>
          <Tabs
            value={currentPage}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            aria-label='page tabs'
          >
            {PAGE_LABELS.map((pageLabel, index) => (
              <Tab label={pageLabel} key={pageLabel} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ ...STYLES.iconsContainer, ...STYLES.flexCenter }}>
          <ContactIcon />
          <Link
            href={GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            sx={STYLES.flexCenter}
          >
            <GitHubIcon sx={STYLES.githubIcon} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const STYLES = {
  visibilityBlockContainer: {
    display: {
      xs: 'none',
      sm: 'block',
    },
  },
  flexContainer: {
    marginBottom: theme.spacing(3),
  },
  tabsContainer: {
    maxWidth: { xs: 320, sm: 480 },
    bgcolor: 'background.paper',
  },
  iconsContainer: {
    gap: theme.spacing(2),
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubIcon: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
};

Menu.propTypes = {
  currentPage: number,
  setCurrentPage: func,
  pageRoutes: arrayOf(string),
};
