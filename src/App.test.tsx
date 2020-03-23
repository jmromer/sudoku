import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders Sudoku header', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Sudoku/i);
    expect(linkElement).toBeInTheDocument();
});
