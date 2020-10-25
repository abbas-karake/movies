import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PropTypes from 'prop-types';

const DrawerComp = (props) => {
	const sm = useMediaQuery('(max-width:576px)');
	const md = useMediaQuery('(max-width:768px)');
	const lg = useMediaQuery('(max-width:992px)');
	const xl = useMediaQuery('(max-width:1200px)');

	let widthDrawer = "40vw";
	if(xl)
		widthDrawer = "60vw";
	if(lg)
		widthDrawer = "65vw";
	if(md)
		widthDrawer = "70vw";
	if(sm)
		widthDrawer = "80vw";

	return (
		<Drawer
			anchor={props.anchor}
			open={props.open}
			onClose={props.onClose}>
	        <Grid
	        	style={{width: widthDrawer, padding: 15}}
	        	container
	        	direction="column">
	        	{props.children}
			</Grid>
		</Drawer>
	);
}

DrawerComp.propTypes = {
    anchor: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default DrawerComp;