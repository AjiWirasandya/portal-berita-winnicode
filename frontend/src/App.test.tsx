import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, React \+ TypeScript!/i);
  expect(linkElement).toBeInTheDocument();
});
