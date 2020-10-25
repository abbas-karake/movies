import React from 'react';
import { shallow } from 'enzyme';
import Card from './index';
import PropTypes from 'prop-types';
import checkPropTypes from 'check-prop-types';

import { findByTestAttr } from '../../../utils/helpers';

const setUp = (props={}) => {
    const component = shallow(<Card {...props} />);
    return component;
};

describe('Card Component', () => {


    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const propTypes = {
                src: PropTypes.string,
                title: PropTypes.string,
                onClick: PropTypes.func
            }

            const expectedProps = {
                src: 'http://',
                title: 'test',
                onClick: () => {}
            };

            const propsErr = checkPropTypes(propTypes, expectedProps, 'props', Card.name);
            expect(propsErr).toBeUndefined();

        });

    });


    describe('Have onClick props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                onClick: () => {}
            };
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'cardContainer');
            expect(component.length).toBe(1);
        });

    });

    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAttr(wrapper, 'cardContainer');
            expect(component.length).toBe(0);
        });


    });


});