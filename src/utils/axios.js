import axios from 'axios';

const instance = axios.create({
	baseURL: "http://www.omdbapi.com"
});

instance.defaults.headers.post['Accept'] = "application/json";
instance.defaults.headers.post['content-type'] = "application/json";

///// only those interceptors will work, the ones in index.js won't /////
instance.interceptors.request.use(request => {
	// console.log(request);
	//Edit request config
	return request;
}, error => {
	console.log(error); // error.message
	return Promise.reject(error);
});

instance.interceptors.response.use(response => {
	// console.log(response);
	//Edit response config
	return response;
}, error => {
	console.log(error); // error.message
	return Promise.reject(error);
});

export default instance;