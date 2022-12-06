import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Component elements render correctly', () => {

  render(<App />);

  const input = screen.getByTestId('input');
  const h2 = screen.getByTestId('h2');
  const button = screen.getByTestId('button');
  const imageContainer = screen.getByTestId('result');

  expect(input).toBeInTheDocument();
  expect(h2).toBeInTheDocument();
  expect(button).toBeEnabled();
  expect(imageContainer).toBeInTheDocument();
});

// ---- Integration test ----

test('Clicking the button after an input call generateImage()', async () => {

  render(<App />);

  const input = screen.getByTestId('input');

  input.innerHTML = 'test';

  expect(input).toHaveTextContent('test');
});


test('Pressing the button after with text in the textbox generate an image and disable the button.', async () => {

  render(<App />);

  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');

  input.innerHTML = 'test';
  fireEvent.click(button);

  expect(input).toHaveTextContent('test');
  expect(button).toBeDisabled();
  expect(await screen.getByAltText('image')).not.toBeInTheDocument();
});
