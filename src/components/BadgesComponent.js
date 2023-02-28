import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Button,
  Link,
} from '@mui/material';
import CodeBlock from './CodeBlock';
import { Link as RouterLink } from 'react-router-dom';

const PEPY_BADGES_URL = 'https://static.pepy.tech/badge/';

const getBadges = (project) => {
  const badgeUrl = PEPY_BADGES_URL + project;
  return [
    {
      imgAlt: 'Total downloads for the project',
      imgSrc: badgeUrl,
      content: `[![Downloads](${badgeUrl})](https://pepy.tech/project/${project})`,
    },
    {
      imgAlt: 'Last 30 days downloads for the project',
      imgSrc: badgeUrl + '/month',
      content: `[![Downloads](${badgeUrl}/month)](https://pepy.tech/project/${project})`,
    },
    {
      imgAlt: 'Last 7 days downloads for the project',
      imgSrc: badgeUrl + '/week',
      content: `[![Downloads](${badgeUrl}/week)](https://pepy.tech/project/${project})`,
    },
  ];
};

const BadgesComponent = ({ project }) => {
  return (
    <Card data-cy="badges">
      <CardHeader title="Badges" />
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          {getBadges(project).map((badge) => (
            <>
              <Grid item xs={6}>
                <img alt={badge.imgAlt} src={badge.imgSrc} />
              </Grid>
              <Grid item xs={6}>
                <CodeBlock content={badge.content} />
              </Grid>
            </>
          ))}
          <Grid item xs={12}>
            <Link
              component={RouterLink}
              to={'/project/' + project + '/personalized-badge'}
            >
              <Button variant="contained" color="primary">
                Personalized badge
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BadgesComponent;
