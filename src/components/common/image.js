import React, {useState} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Auxi from '../hoc/auxi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	modalImage: {
		width: '100%',
		height: 'auto',
		marginBottom: 10
	},
	media: {
		width: '100%',
		height: 140,
	}
}));


export default (props) => {
	const classes = useStyles();
	let [imageLoaded, setImageLoaded] = useState(false);
  	let imageSrc = (props.src === "N/A") ? "/noimage.gif" : props.src;

  	return (
  		<Auxi>
  			<Skeleton
	  			style={imageLoaded ? {display: 'none'} : {}}
	  			animation="wave"
	  			variant="rect"
	  			className={classes.media} />
	  		<img 
	  			className={classes.modalImage}
	  			style={!imageLoaded ? {display: 'none'} : {}}
	        	onLoad={() => setImageLoaded(true)}
				alt={props.alt}
				height="140"
				src={imageSrc}
	        />
  		</Auxi>
  	);
}