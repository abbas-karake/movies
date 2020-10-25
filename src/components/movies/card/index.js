import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  	root: {
		height: '100%'
	},
	rootBotton: {
		height: '100%',
		display: 'inline-flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
    	justifyContent: 'flex-start'
	},
	media: {
		width: '100%',
		height: 140,
	}
}));


const OneCard = (props) => {
  const classes = useStyles();
  let [imageLoaded, setImageLoaded] = useState(false);
  let imageSrc = (!props.src || props.src === "N/A") ? "/noimage.gif" : props.src;
  let title = props.title ? props.title : "";

  if(!props.onClick)
    return null;

  return (
    <Card data-test="cardContainer" onClick={props.onClick} className={classes.root}>
      <CardActionArea className={classes.rootBotton}>
  		<Skeleton
  			style={imageLoaded ? {display: 'none'} : {}}
  			animation="wave"
  			variant="rect"
  			className={classes.media} />
  		<CardMedia 
  			style={!imageLoaded ? {display: 'none'} : {}}
        onLoad={() => setImageLoaded(true)}
        component="img"
        alt={title}
        className={classes.media}
        image={imageSrc}
        title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

OneCard.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default OneCard;