import { render, screen } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';
import '@testing-library/jest-dom';

test('renders button with correct text', () => {
  render(<PrimaryButton label="Submit" onClickHandler={() => {}} />);

  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('calls onClickHandler when clicked', () => {
  const handleClick = jest.fn();
  render(<PrimaryButton label="Submit" onClickHandler={handleClick} />);

  screen.getByText('Submit').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('check element role', () => {
  render(<PrimaryButton label="Submit" onClickHandler={() => {}} />);

  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test('check if button is disabled', () => {
  render(
    <PrimaryButton label="Submit" onClickHandler={() => {}} disabled={true} />
  );

  expect(screen.getByText('Submit')).toBeDisabled();
});
