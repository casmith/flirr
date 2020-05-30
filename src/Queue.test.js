import React from 'react';
import { render } from '@testing-library/react';
import Queue from './Queue';
test('renders simple queue control', () => {
    const {getByText} = render(<Queue />);
    expect(getByText(/Queue:/i)).toBeInTheDocument();
});
