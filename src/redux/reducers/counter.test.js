import {ADD_ONE, REMOVE_ONE} from "../types";
import counterReducer from './counter';

describe('Counter Reducer', () => {

    it('Should return default state', () => {
        const newState = counterReducer(undefined, {});
        expect(newState).toEqual({number: 0});
    });

    it('Should add one', () => {

        const newState = counterReducer(undefined, {
            type: ADD_ONE
        });
        expect(newState).toEqual({number: 1});

    });

    it('Should subtract one', () => {

        const newState = counterReducer(undefined, {
            type: REMOVE_ONE
        });
        expect(newState).toEqual({number: -1});

    });

});