import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const ToasterComp = (props) => {

  	return (
  		<Snackbar
  			open={props.open}
  			autoHideDuration={props.duration}
  			onClose={props.onClose}>
			<MuiAlert onClose={props.onClose} elevation={6} variant="filled" severity={props.severity}>
				{props.message}
			</MuiAlert>
		</Snackbar>
  	);
}

ToasterComp.propTypes = {
    duration: PropTypes.number,
    message: PropTypes.string,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default ToasterComp;