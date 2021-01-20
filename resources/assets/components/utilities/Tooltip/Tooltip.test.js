import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Tooltip from './Tooltip';

const renderTooltip = () =>
  render(
    <Tooltip tooltipContent={<div />}>
      <div />
    </Tooltip>,
  );

describe('The Tooltip component', () => {
  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers();
  });

  /** @test */
  it('renders the tooltip target without the tooltip content', () => {
    renderTooltip();

    expect(screen.getByTestId('tooltip-target')).toBeTruthy();
    expect(screen.queryByTestId('tooltip-content')).toBeNull();
  });

  /** @test */
  it('renders the tooltip content when hovered, and removes when unhovered', async () => {
    renderTooltip();

    userEvent.hover(screen.getByTestId('tooltip-target'));

    expect(screen.getByTestId('tooltip-content')).toBeTruthy();

    userEvent.unhover(screen.getByTestId('tooltip-target'));

    await waitForElementToBeRemoved(screen.getByTestId('tooltip-content'));
  });

  /** @test */
  it('opens the tooltip via touch (for small screens)', async () => {
    renderTooltip();

    userEvent.click(screen.getByTestId('tooltip-target'), { skipHover: true });

    expect(screen.getByTestId('tooltip-content')).toBeTruthy();
  });

  /** @test */
  it("doesn't close the tooltip after unhover, if the tooltip content is hovered", () => {
    renderTooltip();

    userEvent.hover(screen.getByTestId('tooltip-target'));

    expect(screen.getByTestId('tooltip-content')).toBeTruthy();

    userEvent.unhover(screen.getByTestId('tooltip-target'));
    userEvent.hover(screen.getByTestId('tooltip-content'));

    act(() => jest.runAllTimers());

    expect(screen.getByTestId('tooltip-content')).toBeTruthy();
  });

  /** @test */
  it("Opens the tooltip when it's focused and ENTER is hit", () => {
    renderTooltip();

    userEvent.tab({ focusTrap: screen.getByTestId('tooltip-target') });
    userEvent.type(screen.getByTestId('tooltip-target'), '{enter}');

    expect(screen.getByTestId('tooltip-content')).toBeTruthy();
  });
});
