import React from 'react';
import { render } from '@testing-library/react';
import AddToQueue from './AddToQueue';

test('renders "add to queue" label', () => {
    const {getByText} = render(<AddToQueue/>);
    expect(getByText(/add to queue/i)).toBeInTheDocument();
});
