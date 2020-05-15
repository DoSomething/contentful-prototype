import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import ElementButton from './ElementButton';

const onClickCallback = jest.fn();

describe('ElementButton component', () => {
  /**
   * Test rendering a fleshed out, enabled element button.
   */
  test('it renders an element button', () => {
    // Arrange
    const text = 'Click Me';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        className="bg-purple-500"
        onClick={onClickCallback}
        text={text}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('element-button'));

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('element-button')).toHaveTextContent(text);
    expect(screen.getByTestId('element-button')).toHaveClass(
      'btn bg-purple-500',
    );
    expect(screen.getByTestId('element-button')).toBeEnabled();
    expect(screen.getByTestId('element-button')).toHaveAttribute(
      'type',
      'button',
    );

    expect(onClickCallback).toHaveBeenCalled();
  });

  /**
   * Test rendering a fleshed out, disabled element button.
   */
  test('it renders an element button that is disabled', () => {
    // Arrange
    const text = 'You Cannot Click Me';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        className="bg-purple-500"
        isDisabled={true}
        onClick={onClickCallback}
        text={text}
      />,
    );

    screen.debug();

    // Act
    fireEvent.click(screen.getByTestId('element-button'));

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('element-button')).toHaveTextContent(text);
    expect(screen.getByTestId('element-button')).toHaveClass(
      'btn bg-purple-500',
    );
    expect(screen.getByTestId('element-button')).toBeDisabled();
    expect(screen.getByTestId('element-button')).toHaveAttribute(
      'type',
      'button',
    );

    expect(onClickCallback).not.toHaveBeenCalled();
  });

  /**
   * Test rendering a submit element button.
   */
  test('it renders an element button that is of type "submit"', () => {
    // Arrange
    const text = 'Submit';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        text={text}
        type="submit"
      />,
    );

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('element-button')).toBeEnabled();
    expect(screen.getByTestId('element-button')).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
