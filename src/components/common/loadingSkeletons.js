import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
}));



const LoadingSkeletonComp = (props) => {
  const classes = useStyles();

  let skels = [];
  if(props.number) {
    for (var i = props.number - 1; i >= 0; i--) {
      skels.push(<Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent>
              <React.Fragment>
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
            </CardContent>
          </Card>
        </Grid>);
    }
  }
    

  return (
    <Grid container spacing={3}>
      {skels}
    </Grid>
  );
}

LoadingSkeletonComp.propTypes = {
    number: PropTypes.number
}

export default LoadingSkeletonComp;