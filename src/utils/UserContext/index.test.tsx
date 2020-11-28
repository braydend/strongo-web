import React from 'react';
import { shallow } from 'enzyme';
import UserContextProvider from '.';

describe('<UserContextProvider />', () => {
    test('renders without error', () => {
        const wrapper = shallow(<UserContextProvider />);

        expect(wrapper.length).toBe(1);
    });
});
