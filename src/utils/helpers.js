import axios from './axios';



export function sendRequest(data) {

	// let params = {...data, apikey: "723257b5"}; // this will cause an error in edge and IE
    let params = Object.assign({}, data);
    params['apikey'] = "723257b5";

    return axios.get("", {params: params}).then((response) => {

    	let MsgResponse = "Error please try again later";
        if(!(typeof(response.data.Response) === "undefined") && response.data.Response === "True") {
        	return {
                error: false,
                data: response.data
            }
        }
        else {
			if(!(typeof(response.data.Error) === "undefined"))
				MsgResponse = response.data.Error;
		}

		return {
			error: true,
			message: MsgResponse
        }

    })
    .catch((error) =>{
        // handle error
        return {
          error: true,
          message: "Error please try again later"
        }
    });
}


export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};