/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import {
  Box,
  Chip,
  Fade,
  List,
  ListItem,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import { EMPTY_FUNCTION } from '../../utils/utils';
import { API_URL, BASE_URL, EMPTY_STRING, EVENT } from '@/constants/constants';
import Search from '@/components/Layout/Search';
import Link from 'next/link';
import { getPeople } from '../api/people';
import { Methodology } from '../rating';
import InfoIcon from '@mui/icons-material/Info';

const LOGO_URL = './favicon.png';
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png';
const TWITTER_IMAGE_URL = './favicon.png';
const SEARCH_FIELD_ID = 'search-field-people';
const TEXTS = {
  title: 'Popular People',
  subtitle: 'Latest news analyzed by HonestyMeter',
  poweredBy: 'news api powered by newsdata.io',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  articleTitle: 'Article Title',
  source: 'Source',
  objectivityScore: 'Objectivity Score',
  viewReport: 'View Bias Report',
  imageAlt: 'Random illustration image',
  honestyMeter: 'Honesty Meter - Popular People news integrity feed',
  error: 'Something went wrong. Please try again later.',
  desciptiion:
    'Latest news about popular people analyzed by HonestyMeter - AI powered tool for bias detection',
  ogDescription: 'AI powered tool for bias detection',
  shareTitle:
    'HonestyMeter - A New Free AI powered tool for Evaluating the Objectivity and Bias of Media Content.',
  shareDescription:
    'HonestyMeter - Check media content for objectivity and bias.',
  shareHashTags: ['HonestyMeter', 'MediaBias', 'FakeNews'],
  noReportsYet: 'No reports yet',
  objectivityLevel: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
  articleTextExtracted: 'text extraction by url powered by',
  worldNewsApi: 'world news api',
  people: 'People',
  noMatchesFound: 'No matches found',
  name: 'Name',
  searchName: 'Search Name',
};

export default function PeoplePage({ people: peopleFromDb }) {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const personFromQuery = router.query.person || '';
  const [peopleLocal, setPeopleLocal] = useState(peopleFromDb);
  const [searchValue, setSearchValue] = useState('');
  const [isMethodologyModalShown, setIsMethodologyModalShown] = useState(false);
  const isPeopleListEmpty = peopleLocal.length === 0;

  const handleLocalSearch = (e) => {
    const searchValueRes = e.target.value;
    setSearchValue(searchValueRes);

    const filteredPeople = peopleFromDb.filter((person) =>
      person.toLowerCase().includes(searchValueRes.toLowerCase().trim())
    );

    setPeopleLocal(filteredPeople);
  };

  const handleSearchClick = () => {
    va.track(EVENT.searchClickedPeoplePage, { searchValue });

    const trimmedSearchValue = searchValue.trim().toLowerCase().split(' ').join('-');
    if (!trimmedSearchValue) return;

    const url = `/people/${trimmedSearchValue}`;

    router.push(url);
  }

  const clearSearch = () => {
    setSearchValue(EMPTY_STRING);
    setPeopleLocal(peopleFromDb);
  }


  const handleRatingClick = () => {
    setIsMethodologyModalShown(prevShown => !prevShown);
  }

  useEffect(() => {
    va.track(EVENT.peoplePageLoaded);
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      {
        <Box sx={STYLES.container}>
          <Typography variant='h1' sx={STYLES.title}>
            {TEXTS.title}
          </Typography>
          <Modal open={isMethodologyModalShown} onClose={handleRatingClick}>
            <Fade in={isMethodologyModalShown} timeout={{ enter: 300, exit: 400 }}>
              <Box onClick={handleRatingClick}>
                <Methodology />
              </Box>
            </Fade>
          </Modal>
          <Tooltip title={'Click for methodology details'}>
            <Box sx={{
              cursor: 'pointer',
              fontSize: theme.typography.fontSize * 0.75,
              textAlign: 'center',
              color: theme.palette.text.secondary,
              marginBottom: 2,
            }}
              onClick={handleRatingClick}>
              <Typography variant='body1'
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: theme.typography.fontSize * 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}>
                Most Critisized <InfoIcon sx={{ fontSize: theme.typography.fontSize * 1.25, verticalAlign: 'middle', position: 'relative', bottom: '1px' }} />
              </Typography>
              <Typography variant='body1' sx={{ fontSize: 'inherit', marginBottom: 1 }}>
                Justin Timberlake, Kanye West, Brad Pitt
              </Typography>
              <Typography
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: theme.typography.fontSize * 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}>
                Most Praised <InfoIcon sx={{ fontSize: theme.typography.fontSize * 1.25, verticalAlign: 'middle', position: 'relative', bottom: '1px' }} />
              </Typography>
              <Typography sx={{ fontSize: 'inherit' }}>
                Britney Spears, Selena Gomez, Jennifer Lopez
              </Typography>
            </Box>
          </Tooltip>
          <Search
            value={searchValue}
            onChange={handleLocalSearch}
            onClick={handleSearchClick}
            label={TEXTS.name}
            inputLabel={TEXTS.searchName}
            id={SEARCH_FIELD_ID}
            variant='text'
            onClear={clearSearch}
            mobileWidth='auto'
          />
          {
            !isPeopleListEmpty &&
            <Typography variant='body1' sx={STYLES.subtitle}>
              {TEXTS.subtitle}
            </Typography>
          }
          <People
            people={peopleLocal}
            selectedPerson={personFromQuery}
          />
        </Box >
      }
    </>
  );
}

const People = ({ people, selectedPerson }) => {
  const handleClick = (person) => () => {
    va.track(EVENT.personClicked, { person });
  };

  const peopleList = people.map((person) => {
    const isSelected = person === selectedPerson;
    const handleDelete = isSelected ? handleClick(person) : EMPTY_FUNCTION;
    const onDeleteProp = isSelected ? { onDelete: handleDelete } : {};
    const formattedPerson = person.split(' ').join('-').toLowerCase();

    return (
      <ListItem
        key={person}
        sx={STYLES.personListItem}
      >
        <Link href={`/people/${formattedPerson}`} onClick={handleClick(person)}>
          <Chip
            clickable={!isSelected}
            label={person}
            size='small'
            sx={STYLES.personChip}
            color='info'
            {...onDeleteProp}
          />
        </Link>
      </ListItem>
    );
  });

  return (
    <Box
      sx={{
        flex: 1,
        marginBottom: 2,
        display: 'flex',
        alignItems: 'felx-start',
      }}
    >
      <Box>
        <List sx={STYLES.people}>{peopleList}</List>
      </Box>
    </Box>
  );
};

const HtmlHead = (
  <Head>
    <title>{TEXTS.honestyMeter}</title>
    <meta name='description' content={TEXTS.desciptiion} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={TEXTS.honestyMeter} />
    <meta property='og:description' content={TEXTS.ogDescription} />
    <meta property='og:url' content={BASE_URL} />
    <meta property='og:image' content={OPEN_GRAPH_IMAGE_URL} />
    <meta property='twitter:image' content={TWITTER_IMAGE_URL} />
    <link rel='shortcut icon' href={LOGO_URL} />
    <link rel='canonical' href={BASE_URL + '/people'} />
  </Head>
);

export async function getStaticProps() {
  const people = await getPeople();
  const peopleNames = people.map((person) => person.name);

  return {
    props: { people: peopleNames },
    revalidate: 4 * 60 * 60
  };
}

const STYLES = {
  container: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 2, 1),
    flex: 1,
  },
  date: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2, 0, 1, 0),
    fontSize: theme.typography.fontSize * 0.875,
  },
  title: {
    fontSize: theme.typography.fontSize * 2,
    margin: theme.spacing(2, 0, 2),
  },
  subtitle: {
    fontSize: theme.typography.fontSize * 0.875,
    color: theme.palette.text.secondary,
    margin: theme.spacing(1, 2, 0, 2),
    textAlign: 'center',
  },
  poweredBy: {
    fontSize: theme.typography.fontSize * 0.75,
    color: theme.palette.text.secondary,
    opacity: 0.8,
    textAlign: 'center',
    margin: theme.spacing(0, 2, 2, 2),
  },
  newReportButton: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    minWidth: '266px',
  },
  articleInputContainer: {
    width: '100%',
    margin: '0 auto auto',
    padding: theme.spacing(0, 2, 2, 2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  skipIcon: {
    transform: 'scale(0.75)',
  },
  people: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: { xs: theme.spacing(1), sm: theme.spacing(2) },
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  personListItem: {
    width: 'fit-content',
    padding: theme.spacing(0.5),
  },
  personChip: {
    '& hover': {
      backgroundColor: 'auto',
    },
  },
  noReportsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
};
