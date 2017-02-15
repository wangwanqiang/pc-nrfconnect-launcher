/* eslint-disable import/first */

// Do not decorate components
jest.mock('../../util/plugins', () => ({
    decorate: component => component,
}));

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LogHeader from '../LogHeader';

describe('LogHeader', () => {
    it('should render when text and no buttons provided', () => {
        expect(renderer.create(
            <LogHeader
                text="Foobar log header"
                onButtonClicked={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render when buttons are provided', () => {
        expect(renderer.create(
            <LogHeader
                buttons={[
                    {
                        id: 'foo',
                        title: 'Foo button',
                        iconCssClass: 'foo-btn-class',
                    },
                    {
                        id: 'bar',
                        title: 'Bar button',
                        iconCssClass: 'bar-btn-class',
                    },
                ]}
                onButtonClicked={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render when selected button is provided', () => {
        expect(renderer.create(
            <LogHeader
                buttons={[
                    {
                        id: 'foo',
                        title: 'Foo button',
                        iconCssClass: 'foo-btn-class',
                        isSelected: true,
                    },
                ]}
                onButtonClicked={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should invoke onButtonClicked with button id when button is clicked', () => {
        const onButtonClicked = jest.fn();
        const wrapper = mount(
            <LogHeader
                buttons={[
                    {
                        id: 'foo',
                        title: 'Foo button',
                        iconCssClass: 'foo-btn-class',
                    },
                ]}
                onButtonClicked={onButtonClicked}
            />,
        );
        wrapper.find('[title="Foo button"]').simulate('click');

        expect(onButtonClicked).toHaveBeenCalledWith('foo');
    });
});