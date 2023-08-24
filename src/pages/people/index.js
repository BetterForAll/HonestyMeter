/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import va from '@vercel/analytics';
import theme from '@/theme';
import {
  Box,
  Chip,
  List,
  ListItem,
  Typography,
  InputAdornment,
  InputLabel,
  Input,
  FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { EMPTY_FUNCTION } from '../../utils/utils';
import { BASE_URL, EVENT } from '@/constants/constants';
import PEOPLE from '@/data/people';

const LOGO_URL = './favicon.png';
const OPEN_GRAPH_IMAGE_URL = './opengraph-logo.png';
const TWITTER_IMAGE_URL = './favicon.png';
const TEXTS = {
  title: 'Popular People',
  subtitle: 'Click on a person to see articles',
  poweredBy: 'news api powered by newsdata.io',
  newReport: 'Create new bias report',
  cancelNewReport: 'Cancel new report',
  articleTitle: 'Article Title',
  source: 'Source',
  objectivityScore: 'Objectivity Score',
  viewReport: 'View Bias Report',
  imageAlt: 'Random illustration image',
  honestyMeter: 'Honesty Meter',
  error: 'Something went wrong. Please try again later.',
  desciptiion:
    'Honesty Meter is a tool that helps you discover the truth behind the news.',
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
  articleTextExtracted: 'text extrasction by url powered by',
  worldNewsApi: 'world news api',
  people: 'People',
  noMatchesFound: 'No matches found',
};

export default function PeoplePage() {
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page) || 1;
  const personFromQuery = router.query.person || '';
  const [people, setPeople] = useState(PEOPLE);

  const handleLocalSearch = (e) => {
    const searchValue = e.target.value;
    const filteredPeople = PEOPLE.filter((person) =>
      person.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    setPeople(filteredPeople);
  };

  const handlePersonClick = (person) => () => {
    router.push(`/people/${person}`);
  };

  useEffect(() => {
    va.track(EVENT.pageLoaded, { page: pageFromQuery });
  }, [pageFromQuery]);

  return (
    <>
      {HtmlHead}
      {
        <Box sx={STYLES.container}>
          <Typography variant='h2' sx={STYLES.title}>
            {TEXTS.title}
          </Typography>
          <FormControl
            sx={{ m: 1, width: '25ch', marginTop: 1 }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Search Name
            </InputLabel>
            <Input
              id='outlined-adornment-password'
              type='text'
              endAdornment={
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              }
              label='Name'
              onChange={handleLocalSearch}
              sx={{ padding: theme.spacing(0, 0, 1, 0) }}
            />
          </FormControl>
          <Typography variant='body1' sx={STYLES.subtitle}>
            {TEXTS.subtitle}
          </Typography>
          <People
            people={people}
            selectedPerson={personFromQuery}
            onClick={handlePersonClick}
          />
        </Box>
      }
    </>
  );
}

const People = ({ people, selectedPerson, onClick }) => {
  const handleClick = (person) => () => {
    va.track(EVENT.personClicked, { person });
    onClick && onClick(person)();
  };

  const isEmpty = people.length === 0;

  const peopleList = people.map((person) => {
    const isSelected = person === selectedPerson;
    const handleDelete = isSelected ? handleClick(person) : EMPTY_FUNCTION;
    const onDeleteProp = isSelected ? { onDelete: handleDelete } : {};

    return (
      <ListItem
        key={person}
        sx={STYLES.personListItem}
        onClick={handleClick(person)}
      >
        <Chip
          clickable={!isSelected}
          label={person}
          size='small'
          sx={STYLES.personChip}
          color='info'
          {...onDeleteProp}
        />
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
      {isEmpty ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.disabled }}
          >
            {TEXTS.noMatchesFound}
          </Typography>
        </Box>
      ) : (
        <Box>
          <List sx={STYLES.people}>{peopleList}</List>
        </Box>
      )}
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

const STYLES = {
  container: {
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
    margin: theme.spacing(2, 0, 1),
  },
  subtitle: {
    fontSize: theme.typography.fontSize * 0.875,
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 2, 0.5, 2),
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
