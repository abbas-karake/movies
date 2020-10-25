import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
  },
}));

const PagingComp = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');
  let sibling = matches ? 0 : 1;
  return (
    <div className={classes.root}>
      <Pagination
        count={props.count}
        page={props.page}
        color="primary"
        shape="rounded"
        onChange={props.handleChange}
        siblingCount={sibling} />
    </div>
  );
}

PagingComp.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default PagingComp;