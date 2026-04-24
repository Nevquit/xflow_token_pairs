import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders Solana Xport Dashboard title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Solana Xport Dashboard/i);
  expect(linkElement).toBeDefined();
});
