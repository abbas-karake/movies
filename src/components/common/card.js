import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ButtonAppBar(props) {
  const classes = useStyles();
  let [imageLoaded, setImageLoaded] = useState(false);
  let imageSrc = (props.src === "N/A") ? "/noimage.gif" : props.src;

  return (
    <Card onClick={props.onClick} className={classes.root}>
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
        alt={props.title}
        className={classes.media}
        image={imageSrc}
        title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}