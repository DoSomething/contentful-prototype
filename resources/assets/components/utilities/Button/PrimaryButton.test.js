import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import PrimaryButton from './PrimaryButton';

const onClickCallback = jest.fn();

describe('PrimaryButton component', () => {
  /** @test */
  test('it renders an anchor link primary button', () => {
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

    fireEvent.click(screen.getByTestId('primary-button'));

    expect(container.querySelector('a')).toBeInTheDocument();

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('primary-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('primary-button')).toHaveClass(
      'btn bg-blurple-500 hover:bg-blurple-400 text-white',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /** @test */
  test('it renders a button element primary button', () => {
    const text = 'Submit Photo';

    const { container } = render(
      <PrimaryButton
        attributes={{ 'data-testid': 'primary-button' }}
        text={text}
        onClick={onClickCallback}
        type="submit"
      />,
    );

    fireEvent.click(screen.getByTestId('primary-button'));

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
