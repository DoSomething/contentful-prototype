import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import ElementButton from './ElementButton';

const onClickCallback = jest.fn();

describe('ElementButton component', () => {
  /** @test */
  test('it renders an element button', () => {
    const text = 'Click Me';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        className="bg-purple-500"
        onClick={onClickCallback}
        text={text}
      />,
    );

    fireEvent.click(screen.getByTestId('element-button'));

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

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /** @test */
  test('it renders an element button that is disabled', () => {
    const isDisabled = true;
    const text = 'You Cannot Click Me';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        className="bg-purple-500"
        isDisabled={isDisabled}
        onClick={onClickCallback}
        text={text}
      />,
    );

    fireEvent.click(screen.getByTestId('element-button'));

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

  /** @test */
  test('it renders an element button that is of type "submit"', () => {
    const text = 'Submit';

    render(
      <ElementButton
        attributes={{ 'data-testid': 'element-button' }}
        text={text}
        type="submit"
      />,
    );

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('element-button')).toBeEnabled();
    expect(screen.getByTestId('element-button')).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
