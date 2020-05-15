import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import ToggleButton from './ToggleButton';

const onClickCallback = jest.fn();

describe('ToggleButton component', () => {
  /**
   * Test rendering a toggle "on" button.
   */
  test('it renders a button element toggle button that can be toggled "on"', () => {
    // Arrange
    const activateText = 'Toggle On';
    const deactivateText = 'Toggle Off';
    const isToggled = false;

    const { container } = render(
      <ToggleButton
        activateText={activateText}
        attributes={{ 'data-testid': 'toggle-button' }}
        deactivateText={deactivateText}
        isToggled={isToggled}
        onClick={onClickCallback}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('toggle-button'));

    // Assert
    expect(container.querySelector('button')).toBeInTheDocument();

    expect(screen.getByText(activateText)).toBeInTheDocument();

    expect(screen.getByTestId('toggle-button')).toHaveClass(
      'btn bg-blurple-500 hover:bg-blurple-400 text-white',
    );
    expect(screen.getByTestId('toggle-button')).toHaveAttribute(
      'type',
      'button',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /**
   * Test rendering a toggle "off" button.
   */
  test('it renders a button element toggle button that can be toggled "on"', () => {
    // Arrange
    const activateText = 'Toggle On';
    const deactivateText = 'Toggle Off';
    const isToggled = true;

    const { container } = render(
      <ToggleButton
        activateText={activateText}
        attributes={{ 'data-testid': 'toggle-button' }}
        deactivateText={deactivateText}
        isToggled={isToggled}
        onClick={onClickCallback}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('toggle-button'));

    // Assert
    expect(container.querySelector('button')).toBeInTheDocument();

    expect(screen.getByText(deactivateText)).toBeInTheDocument();

    expect(screen.getByTestId('toggle-button')).toHaveClass(
      'btn bg-white border-blurple-500 hover:border-blurple-300 text-blurple-500',
    );
    expect(screen.getByTestId('toggle-button')).toHaveAttribute(
      'type',
      'button',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });
});
