import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import SecondaryButton from './SecondaryButton';

const onClickCallback = jest.fn();

describe('SecondaryButton component', () => {
  /** @test */
  test('it renders an anchor link secondary button', () => {
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

    fireEvent.click(screen.getByTestId('secondary-button'));

    expect(container.querySelector('a')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('secondary-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('secondary-button')).toHaveClass(
      'btn bg-white border-blurple-500 hover:border-blurple-300 text-blurple-500',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /** @test */
  test('it renders a button element secondary button', () => {
    const text = 'Get Started';

    const { container } = render(
      <SecondaryButton
        attributes={{ 'data-testid': 'secondary-button' }}
        text={text}
        onClick={onClickCallback}
        type="submit"
      />,
    );

    fireEvent.click(screen.getByTestId('secondary-button'));

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
