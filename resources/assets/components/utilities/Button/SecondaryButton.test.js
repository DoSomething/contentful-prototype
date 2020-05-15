import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import SecondaryButton from './SecondaryButton';

const onClickCallback = jest.fn();

describe('SecondaryButton component', () => {
  /**
   * Test rendering a secondary button as a link button.
   */
  test('it renders an anchor link secondary button', () => {
    // Arrange
    const text = 'Explore Campaigns';
    const url = '/us/campaigns';

    const { container } = render(
      <SecondaryButton
        attributes={{ 'data-testid': 'secondary-button' }}
        href={url}
        onClick={onClickCallback}
        text={text}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('secondary-button'));

    // Assert
    expect(container.querySelector('a')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('secondary-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('secondary-button')).toHaveClass(
      'btn bg-white border-blurple-500 hover:border-blurple-300 text-blurple-500',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /**
   * Test rendering a secondary button as an element button.
   */
  test('it renders a button element secondary button', () => {
    // Arrange
    const text = 'Get Started';

    const { container } = render(
      <SecondaryButton
        attributes={{ 'data-testid': 'secondary-button' }}
        text={text}
        onClick={onClickCallback}
        type="submit"
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('secondary-button'));

    // Assert
    expect(container.querySelector('button')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('secondary-button')).toHaveClass(
      'btn bg-white border-blurple-500 hover:border-blurple-300 text-blurple-500',
    );
    expect(screen.getByTestId('secondary-button')).toHaveAttribute(
      'type',
      'submit',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });
});
