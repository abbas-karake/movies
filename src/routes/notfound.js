import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default () => {
	return (
		<Grid container justify="center" alignItems="center">
			<Typography variant="h6" gutterBottom style={{color: 'red', marginTop: 30}}>404 not found</Typography>
	    </Grid>
	);
}