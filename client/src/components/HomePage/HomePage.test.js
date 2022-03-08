import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './HomePage';

it('renders Welcome to FresherFriend', () => {
  render(<App />);
  expect(screen.getByText('Welcome to Fresher Friend.')).toBeInTheDocument();
});
