import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import PrimaryButton from './PrimaryButton';

const onClickCallback = jest.fn();

describe('PrimaryButton component', () => {
  /**
   * Test rendering a primary button as a link button.
   */
  test('it renders an anchor link primary button', () => {
    // Arrange
    const text = 'Join Campaign';
    const url = '/us/campaigns/adopt-all-the-cats';

    const { container } = render(
      <PrimaryButton
        attributes={{ 'data-testid': 'primary-button' }}
        href={url}
        onClick={onClickCallback}
        text={text}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('primary-button'));

    // Assert
    expect(container.querySelector('a')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('primary-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('primary-button')).toHaveClass(
      'btn bg-blurple-500 hover:bg-blurple-400 text-white',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /**
   * Test rendering a primary button as an element button.
   */
  test('it renders a button element primary button', () => {
    // Arrange
    const text = 'Submit Photo';

    const { container } = render(
      <PrimaryButton
        attributes={{ 'data-testid': 'primary-button' }}
        text={text}
        onClick={onClickCallback}
        type="submit"
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('primary-button'));

    // Assert
    expect(container.querySelector('button')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('primary-button')).toHaveClass(
      'btn bg-blurple-500 hover:bg-blurple-400 text-white',
    );
    expect(screen.getByTestId('primary-button')).toHaveAttribute(
      'type',
      'submit',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });
});
