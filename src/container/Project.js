import React, { useEffect } from 'react';
import { fetchProject } from '../api/project';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, CircularProgress, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import ProjectSummary from '../components/ProjectSummary';
import BadgesComponent from '../components/BadgesComponent';
import Notification from '../components/Notification';
import SearchAppBar from '../components/SearchAppBar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import CarbonAds from '../components/CarbonAds';
import DownloadsComponent from '../components/DownloadsComponent';
import GitHubButton from 'react-github-btn';
import ServerError from '../components/ServerError';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProject: (projectId) => {
    dispatch(fetchProject(projectId));
  },
});

const Project = ({ classes, projectId, fetchProject, project }) => {
  useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId, fetchProject]);

  const sumLastDownloads = (downloads) => {
    return downloads.reduce(
      (carry, versions) =>
        carry +
        Object.values(versions).reduce(
          (carry, versionDownloads) => carry + versionDownloads
        ),
      0
    );
  };

  if (project.status !== FETCHING_STATUS.fetched) {
    return (
      <div className={classes.page}>
        <SearchAppBar />
        <Grid container className={classes.layout} justifyContent="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </div>
    );
  }
  const render404Page = (classes) => {
    return (
      <div className={classes.page}>
        <SearchAppBar />
        <Grid
          container
          spacing={2}
          className={classes.layout}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Error 404</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Project <i>{project.projectId}</i> was not found. These can be the
              reasons:
              <ul>
                <li>You made a typo and the project doesn't exist.</li>
                <li>
                  If the project exists in PyPI, probably, it's a new project.
                  The downloads are updated once a day, check our{' '}
                  <Link component={RouterLink} to="/about">
                    FAQ
                  </Link>{' '}
                  about when the downloads are updated.
                </li>
              </ul>
              If not of the above is the case please open an issue in our{' '}
              <a href="https://github.com/psincraian/pepy">GitHub</a>.
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  };

  const render5XXPage = (classes) => {
    return (
      <div className={classes.page}>
        <SearchAppBar />
        <ServerError />
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  };

  if (project.error === 404) {
    return render404Page(classes);
  } else if (project.error >= 500) {
    return render5XXPage(classes);
  }

  var lastDate = new Date('2022-04-07').setHours(0, 0, 0, 0);
  var today = new Date().setHours(0, 0, 0, 0);
  var notification = null;
  if (today < lastDate) {
    notification = (
      <Grid item xs={12}>
        <Notification
          severity="info"
          message={
            <Typography>
              Help us reach 500 stars on GitHub{' '}
              <GitHubButton
                href="https://github.com/psincraian/pepy"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star psincraian/pepy on GitHub"
              >
                Star
              </GitHubButton>
            </Typography>
          }
        />
      </Grid>
    );
  }

  return (
    <>
      <Helmet>
        <title>PePy - {project.id} Download Stats</title>
        <meta
          name="description"
          content={
            'Check the download stats of ' +
            project.id +
            ' library. It has a total of ' +
            project.total_downloads +
            ' downloads.'
          }
        />
      </Helmet>
      <SearchAppBar />
      <Grid
        container
        justifyContent="center"
        className={classes.layout}
        spacing={2}
      >
        {notification}
        <Grid item xs={12}>
          <Typography component="h1" variant="h2">
            {project.id}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} xl={4} order={{ xs: 1, xl: 1 }}>
          <ProjectSummary
            totalDownloads={project.total_downloads}
            totalDownloads30Days={sumLastDownloads(
              Object.values(project.downloads).reverse().slice(0, 30)
            )}
            totalDownloads7Days={sumLastDownloads(
              Object.values(project.downloads).reverse().slice(0, 7)
            )}
            name={project.id}
          />
        </Grid>
        <Grid item md={5} xl={4} order={{ xs: 2, xl: 3 }}>
          <CarbonAds />
        </Grid>
        <Grid item xs={12} xl={4} order={{ xs: 3, xl: 2 }}>
          <BadgesComponent project={project.id} />
        </Grid>
        <Grid item xs={12} order={{ xs: 4, xl: 4 }}>
          <DownloadsComponent data={project} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
