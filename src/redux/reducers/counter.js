import {ADD_ONE, REMOVE_ONE} from "../types";

const initialState = {
	number: 0
}

const counter = (state = initialState, action) => {
    switch(action.type) {
		case ADD_ONE:
			return {number: state.number + 1}
		case REMOVE_ONE:
			return {number: state.number - 1}
        default:
            return Object.assign({}, state);
	}
};
export default counter;