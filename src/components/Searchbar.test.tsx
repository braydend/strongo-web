import React from 'react';
import { shallow } from 'enzyme';
import Searchbar from './Searchbar';

describe('<Searchbar />', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<Searchbar onChange={() => {}} />);

        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toContain('Search');
    });

    test('onChange callback is fired when query is updated', () => {
        const callback = jest.fn();
        const wrapper = shallow(<Searchbar onChange={callback} />);
        const input = wrapper.find('FormControl');
    
        input.simulate('change', { target: { value: 'first Search'}});
        input.simulate('change', { target: { value: 'second Search'}});

        expect(callback.mock.calls.length).toBe(2);
    })
});