import React from 'react';
import { incrementOne, decrementOne } from "../redux/actions/counter";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExposureNeg1RoundedIcon from '@material-ui/icons/ExposureNeg1Rounded';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';

const counter = (props) => {

	return (
		<Grid container direction="row" justify="center" alignItems="center">
			<Button onClick={props.decrementOne} variant="contained" color="secondary"><ExposureNeg1RoundedIcon /></Button>
			<p style={{margin: '30px 20px'}}>{props.number}</p>
			<Button onClick={props.incrementOne} variant="contained" color="primary"><PlusOneRoundedIcon /></Button>
		</Grid>
	);
}

const mapStateToProps = state => ({
	number: state.counter.number
});

const mapDispatchToProps = {
	incrementOne: incrementOne,
	decrementOne: decrementOne
}

export default connect(mapStateToProps, mapDispatchToProps)(counter);