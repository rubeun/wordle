import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Rubeun's Wordle/i);
  expect(headerElement).toBeInTheDocument();
});
