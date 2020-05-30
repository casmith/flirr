import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the "add to queue" control', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/add to queue/i);
  expect(linkElement).toBeInTheDocument();
});
