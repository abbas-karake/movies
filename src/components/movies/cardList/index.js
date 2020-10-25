import React from 'react';
import Card from '../card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const CardList = (props) => {

	if(!props.cardClickFunc || !props.listData)
		return null;

	return (
		<Grid data-test="cardListContainer" container spacing={3}>
			{props.listData.map(item => {
				return (
					<Grid key={item.imdbID} item xs={12} sm={6} md={4} lg={3}>
						<Card 
							onClick={() => props.cardClickFunc(item.imdbID)}
							src={item.Poster}
							title={item.Title} />
					</Grid>
				)
			})}
		</Grid>
	);
}

CardList.propTypes = {
    cardClickFunc: PropTypes.func,
    listData: PropTypes.arrayOf(PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
        Poster: PropTypes.string,
        Title: PropTypes.string
    }))
}


export default CardList;