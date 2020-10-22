import React from 'react';
import Auxi from '../components/hoc/auxi';
import Toolbar from '../components/common/toolbar';
import Movies from './movies';
import Counter from './counter';
import NotFound from './notfound';
import Container from '@material-ui/core/Container';
import { Route, Switch, useLocation } from 'react-router-dom';

export default props => {
	const location = useLocation();
	return (
		<Auxi>
			<Toolbar path={location.pathname} />
			<Container fixed>
				<Switch>
					<Route path="/" exact><Movies /></Route>
					<Route path="/counter" exact><Counter /></Route>
					<Route><NotFound /></Route>
				</Switch>
			</Container>
		</Auxi>
	);
}