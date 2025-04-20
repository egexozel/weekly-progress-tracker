import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('displays the class selector', () => {
    render(<App />);
    const classSelector = screen.getByRole('navigation');
    expect(classSelector).toBeInTheDocument();
  });
});
