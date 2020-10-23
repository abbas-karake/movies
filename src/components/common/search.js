import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';

const styles = theme => ({
	rootSearch: {
		marginTop: 20,
		marginBottom: 20,
	    padding: '2px 4px',
	    display: 'flex',
	    alignItems: 'center',
	    width: '100%'
	},
	searchError: {
		border: '1px solid red',
		boxShadow: 'none'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	errorMessage: {
		color: 'red',
		position: 'relative',
		bottom: 12
	}
});

class ButtonAppBar extends Component {

	constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.currentTarget.value);
    }
    render() {

    	let {classes, value, placeholder} = this.props;

		// An error message is passed only if the component is invalid
        let errorMessage = this.props.errorMessage;
        let valid = (this.props.isValid) ? true : false;
        if(this.props.isPristine)
        	valid = true;

		return (
		<Grid container>
			<Paper component="div" className={classes.rootSearch+" "+(!valid ? classes.searchError : "")}>
				<InputBase
					value={value || ''}
					ref={(inp) => { this.inputElementName = inp }}
					onChange={this.changeValue}
				    className={classes.input}
				    placeholder={placeholder}
				/>
				<IconButton type="submit" className={classes.iconButton} aria-label="search">
					<SearchIcon />
				</IconButton>
			</Paper>
			{!valid && <div className={classes.errorMessage}>{errorMessage}</div>}
		</Grid>
		);
	}
}


export default withStyles(styles)(withFormsy(ButtonAppBar))