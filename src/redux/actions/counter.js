import {ADD_ONE, REMOVE_ONE} from "../types";

export const incrementOne = () => ({
	type: ADD_ONE
});

export const decrementOne = () => ({
	type: REMOVE_ONE
});