import { render, screen, fireEvent } from '@testing-library/react';
import { click } from '@testing-library/user-event/dist/click';
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

test('Submitting a search display an image', () => {

  render(<App />);

  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');
  const generateImage = App.generateImage;

  input.innerHTML = 'test';
  fireEvent.click(button);

  expect(generateImage).toBeCalled;

})
