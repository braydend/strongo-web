import { fireEvent, render, screen } from '@testing-library/react';
import React, { ComponentProps } from 'react';
import Searchbar from './Searchbar';

type SearchbarProps = ComponentProps<typeof Searchbar>;

describe('<Searchbar />', () => {
    const setUp = (customProps?: Partial<SearchbarProps>) => {
        const defaultProps: SearchbarProps = {
            onChange: jest.fn(),
        };
        const props = { ...defaultProps, ...customProps };
        render(<Searchbar {...props} />)
    };

    test('renders correctly', async () => {
        setUp();

        expect(await screen.findByText('Search for an exercise:')).toBeTruthy();
    });

    test('onChange callback is fired when query is updated', async () => {
        const callback = jest.fn();
        setUp({ onChange: callback });
        const input = await screen.findByPlaceholderText('Search');
    
        fireEvent.change(input, { target: { value: 'first Search'}});
        fireEvent.change(input, { target: { value: 'second Search'}});

        expect(callback).toHaveBeenCalledTimes(2);
    })
});