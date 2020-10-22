import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  	toolbar: {
		backgroundColor: '#2c343c',
		'& .MuiButton-colorInherit .MuiButton-label': {
			color: 'white'
		}
	},
	titleToolbar: {
		flexGrow: 1,
		color: 'white'
	}
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.toolbar} position="static">
		<Toolbar>
			<Typography variant="h6" className={classes.titleToolbar}>
			MOVIE FINDER
			</Typography>
			<Link to="/"><Button className="menuButton" color={(props.path === "/") ? "secondary" : "inherit"}>Movies</Button></Link>
			<Link to="/counter"><Button className="menuButton" color={(props.path === "/counter") ? "secondary" : "inherit"}>Counter</Button></Link>
		</Toolbar>
	</AppBar>
  );
}