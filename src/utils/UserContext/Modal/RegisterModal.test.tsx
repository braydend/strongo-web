import { render, screen } from '@testing-library/react';
import React from 'react';
import RegisterModal from './RegisterModal';

describe('<RegisterModal />', () => {
    test('renders correctly', () => {
        render(<RegisterModal show={true} onClose={jest.fn()} />);

        expect(screen.getByLabelText('Username')).toBeTruthy();
        expect(screen.getByLabelText('Email')).toBeTruthy();
        expect(screen.getByLabelText('Password')).toBeTruthy();
        expect(screen.getByText("Register!")).toBeTruthy();
    });
});