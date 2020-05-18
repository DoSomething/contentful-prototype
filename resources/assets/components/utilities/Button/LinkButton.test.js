import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import LinkButton from './LinkButton';

const onClickCallback = jest.fn();

describe('LinkButton component', () => {
  /** @test */
  test('it renders an anchor link button with internal url', () => {
    const text = 'View Campaigns';
    const url = '/';

    render(
      <LinkButton
        attributes={{ 'data-testid': 'link-button' }}
        className="bg-orange-500"
        href={url}
        onClick={onClickCallback}
        text={text}
      />,
    );

    fireEvent.click(screen.getByTestId('link-button'));

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('link-button')).toHaveTextContent(text);
    expect(screen.getByTestId('link-button')).toHaveClass('btn bg-orange-500');
    expect(screen.getByTestId('link-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('link-button')).not.toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByTestId('link-button')).not.toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  /** @test */
  test('it renders an anchor link button with external url that opens in new tab', () => {
    const text = 'Click This Link!';
    const url = 'http://example.com/';

    render(
      <LinkButton
        attributes={{ 'data-testid': 'link-button' }}
        className="bg-orange-500"
        href={url}
        onClick={onClickCallback}
        text={text}
      />,
    );

    fireEvent.click(screen.getByTestId('link-button'));

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId('link-button')).toHaveTextContent(text);
    expect(screen.getByTestId('link-button')).toHaveClass('btn bg-orange-500');
    expect(screen.getByTestId('link-button')).toHaveAttribute('href', url);
    expect(screen.getByTestId('link-button')).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByTestId('link-button')).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });
});
