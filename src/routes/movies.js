import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Formsy from 'formsy-react';
import Typography from '@material-ui/core/Typography';

import Auxi from '../components/hoc/auxi';
import Drawer from '../components/common/drawer';
import Modal from '../components/common/modal';
import Paging from '../components/common/paging';
import Image from '../components/common/image';
import Toaster from '../components/common/toaster';
import LoadingSkeletons from '../components/common/loadingSkeletons';

import Search from '../components/movies/search';
import CardList from '../components/movies/cardList';

import {sendRequest} from '../utils/helpers';


const validations = {
	title: {
		minLength: 3,
		maxLength: 255
	}
};

const validationErrors = {
	title: {
		minLength: "You can not type in less than 3 characters",
		maxLength: "You can not type in more than 3 characters"
	}
};


class Movies extends Component{

	state = {
		//// TRUE FOR DRAWER AND FALSE FOR MODAL ////
		openInDrawer: true,
		//// TRUE FOR DRAWER AND FALSE FOR MODAL ////

		error: false,
		errorMsg: "",

		valid: false,
		loading: false,
		listData: [],
		word: "",
		showModal: false,
		loadedData: null,
		page: 1,
		pagingCount: 0
	}

	searchForMovieHandler = (page = 1, search = true, word = "") => {
		let stateData = {
			loading: true
		}

		if(search){
			stateData['word'] = word;
			stateData['listData'] = [];
		}

		this.setState(stateData);

		let wordSearchValue = (word !== "") ? word : this.state.word;

		sendRequest({s: wordSearchValue, page: page, type: 'movie'}).then((response) => {
			this.setState({loading: false});
			if(!response.error) {
				let stateUpdate = {};

				let listData = [];
				if(!(typeof(response.data.Search) === "undefined") && Array.isArray(response.data.Search))
					listData = response.data.Search
				stateUpdate['listData'] = listData;

				if(search) {
					//// get page number if searching only ////
					let pagingCount = 0;
					if(!(typeof(response.data.totalResults) === "undefined"))
						pagingCount = Math.ceil(response.data.totalResults/10);
					stateUpdate['pagingCount'] = pagingCount;
					//// get page number if searching only ////
				}

				stateUpdate['page'] = page;
				this.setState(stateUpdate);
			}
			else {
				this.setState({error: true, errorMsg: response.message});
			}
		});
	}


	searchHandler = (data, resetForm, invalidateForm) => {
		if(this.state.valid && !this.state.loading) {
			this.searchForMovieHandler(1, true, data.title);
		}
	}

	loadDataHandler = (imdbID) => {
		this.setState({showModal: true, loadedData: null});
		sendRequest({i: imdbID, plot: 'full', type: 'movie'}).then((response) => {
			if(!response.error) {

				let loadedData = {
					Title: (response.data.Title) ? response.data.Title : "",
					Year: (response.data.Year) ? response.data.Year : "",
					Rated: (response.data.Rated) ? response.data.Rated : "",
					Released: (response.data.Released) ? response.data.Released : "",
					Runtime: (response.data.Runtime) ? response.data.Runtime : "",
					Genre: (response.data.Genre) ? response.data.Genre : "",
					Plot: (response.data.Plot) ? response.data.Plot : "",
					Awards: (response.data.Awards) ? response.data.Awards : "",
					Poster: (response.data.Poster) ? response.data.Poster : "",
					imdbRating: (response.data.imdbRating) ? response.data.imdbRating : ""
				}
				this.setState({loadedData: loadedData});
			}
			else {
				this.setState({error: true, errorMsg: response.message});
			}
		});
	}
	
	render() {

		return (
			<Auxi>

				<Toaster
					open={this.state.error}
					duration={6000}
					onClose={() => this.setState({error: false})}
					severity="error"
					message={this.state.errorMsg} />


				{/* search part */}
				<Formsy onSubmit={this.searchHandler} onValid={() => this.setState({valid: true})} onInvalid={() => this.setState({valid: false})}>
					<Search
						name="title"
	            		validations={validations.title}
	            		validationErrors={validationErrors.title}
						validationError="This field is required" 
						placeholder="Search"
						required />
				</Formsy>
				{/* search part */}


				{this.state.loading && 
				<LoadingSkeletons number={8} />}


				{/* data and paging part */}
				{!this.state.loading && this.state.listData.length>0 &&
					<Auxi>
						<CardList
							listData={this.state.listData}
							cardClickFunc={(imdbID) => this.loadDataHandler(imdbID)} />

						{this.state.pagingCount > 1 &&
							<Grid container justify="center" alignItems="center">
								<Paging
									count={this.state.pagingCount}
									page={this.state.page}
									handleChange={(event, value) => this.searchForMovieHandler(value, false)} />
							</Grid>}
					</Auxi>
				}
				{/* data and paging part */}






				{/* Movie details MODEL WAY */}
				{!this.state.openInDrawer && 
				<Modal
					show={this.state.showModal}
					onClose={() => this.setState({showModal: false})}
					title={(this.state.loadedData !== null) && this.state.loadedData.Title}>

					{this.state.loadedData === null && 
					<Grid container justify="center" alignItems="center">
						<CircularProgress color="secondary" />
					</Grid>}

		        	{this.state.loadedData !== null && 
					<Auxi>
				      	<Image
							src={this.state.loadedData.Poster}
							alt={this.state.loadedData.Title} />
						<Typography variant="subtitle1" gutterBottom>
						<b>Year: </b> {this.state.loadedData.Year}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Rated: </b> {this.state.loadedData.Rated}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Released: </b> {this.state.loadedData.Released}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Runtime: </b> {this.state.loadedData.Runtime}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Genre: </b> {this.state.loadedData.Genre}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Plot: </b> {this.state.loadedData.Plot}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Awards: </b> {this.state.loadedData.Awards}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>imdbRating: </b> {this.state.loadedData.imdbRating}
						</Typography>
					</Auxi>}
				</Modal>}
				{/* Movie details MODEL WAY */}


				{/* Movie details DRAWER WAY */}
				{this.state.openInDrawer && 
				<Drawer 
					anchor="right"
					open={this.state.showModal}
					onClose={() => this.setState({showModal: false})}>

					{this.state.loadedData === null && 
					<Grid container justify="center" alignItems="center">
						<CircularProgress color="secondary" />
					</Grid>}

		        	{this.state.loadedData !== null && 
					<Auxi>
						<Typography variant="h6" gutterBottom>
				        {this.state.loadedData.Title}
				      	</Typography>
				      	<Image
							src={this.state.loadedData.Poster}
							alt={this.state.loadedData.Title} />
						<Typography variant="subtitle1" gutterBottom>
						<b>Year: </b> {this.state.loadedData.Year}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Rated: </b> {this.state.loadedData.Rated}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Released: </b> {this.state.loadedData.Released}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Runtime: </b> {this.state.loadedData.Runtime}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Genre: </b> {this.state.loadedData.Genre}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Plot: </b> {this.state.loadedData.Plot}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Awards: </b> {this.state.loadedData.Awards}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>imdbRating: </b> {this.state.loadedData.imdbRating}
						</Typography>
					</Auxi>}

				</Drawer>}
				{/* Movie details DRAWER WAY */}



			</Auxi>
		)
	}
		
}


export default Movies;