import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
  },
}));

export default function BasicPagination(props) {
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
