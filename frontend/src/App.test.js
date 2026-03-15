import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock child components so tests focus on App rendering and avoid network/API calls.
jest.mock('./components/ProductForm', () => () => <div data-testid="product-form" />);
jest.mock('./components/ProductList', () => () => <div data-testid="product-list" />);
jest.mock('./components/SearchBar', () => () => <div data-testid="search-bar" />);

test('renders product inventory heading', () => {
  render(<App />);
  expect(screen.getByText(/product inventory/i)).toBeInTheDocument();
});
