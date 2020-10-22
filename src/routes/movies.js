import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Formsy from 'formsy-react';
import Auxi from '../components/hoc/auxi';
import Search from '../components/common/search';
import Card from '../components/common/card';
import Modal from '../components/common/modal';
import Paging from '../components/common/paging';
import Image from '../components/common/image';
import Toaster from '../components/common/toaster';
import LoadingSkeletons from '../components/common/loadingSkeletons';
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
				<LoadingSkeletons number="8" />}


				{/* data and paging part */}
				{!this.state.loading && this.state.listData.length>0 &&
					<Auxi>
						<Grid container spacing={3}>
							{this.state.listData.map(item => {
								return (
									<Grid key={item.imdbID} item xs={12} sm={6} md={4} lg={3}>
										<Card 
											onClick={() => this.loadDataHandler(item.imdbID)}
											src={item.Poster}
											title={item.Title} />
									</Grid>
								)
							})}
						</Grid>
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



				{/* one movie details part */}
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
							<p><b>Year: </b> {this.state.loadedData.Year}</p>
							<p><b>Rated: </b> {this.state.loadedData.Rated}</p>
							<p><b>Released: </b> {this.state.loadedData.Released}</p>
							<p><b>Runtime: </b> {this.state.loadedData.Runtime}</p>
							<p><b>Genre: </b> {this.state.loadedData.Genre}</p>
							<p><b>Plot: </b> {this.state.loadedData.Plot}</p>
							<p><b>Awards: </b> {this.state.loadedData.Awards}</p>
							<p><b>imdbRating: </b> {this.state.loadedData.imdbRating}</p>
						</Auxi>}
				</Modal>
				{/* one movie details part */}


			</Auxi>
		)
	}
		
}


export default Movies;