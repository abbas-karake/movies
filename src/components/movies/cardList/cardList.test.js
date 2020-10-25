import React from 'react';
import { shallow } from 'enzyme';
import CardList from './index';
import PropTypes from 'prop-types';
import checkPropTypes from 'check-prop-types';

import { findByTestAttr } from '../../../utils/helpers';

const setUp = (props={}) => {
    const component = shallow(<CardList {...props} />);
    return component;
};

describe('Card List Component', () => {


    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const propTypes = {
                cardClickFunc: PropTypes.func,
                listData: PropTypes.arrayOf(PropTypes.shape({
                    imdbID: PropTypes.string.isRequired,
                    Poster: PropTypes.string,
                    Title: PropTypes.string
                }))
            }

            const expectedProps = {
                cardClickFunc: () => {},
                listData: [{
                    imdbID: "test111",
                    Poster: "http://",
                    Title: "test"
                }]
            };

            const propsErr = checkPropTypes(propTypes, expectedProps, 'props', CardList.name);
            expect(propsErr).toBeUndefined();

        });

    });


    describe('Have cardClickFunc props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                listData: [{imdbID: "123"}],
                cardClickFunc: () => {}
            };
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'cardListContainer');
            expect(component.length).toBe(1);
        });

    });

    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAttr(wrapper, 'cardListContainer');
            expect(component.length).toBe(0);
        });


    });


});