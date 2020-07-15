import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { userFactory } from '../../../../../cypress/fixtures/user';
import VoterRegistrationReferrals from './VoterRegistrationReferrals';

const renderVoterRegistrationReferrals = ({ completed, started }) =>
  render(
    <VoterRegistrationReferrals completed={completed} started={started} />,
  );

describe('VoterRegistrationReferrals component', () => {
  /** @test */
  it('Displays help text if completed or started props are empty', async () => {
    renderVoterRegistrationReferrals({ completed: [], started: [] });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You haven’t helped anyone register to vote yet. Scroll down to get started!',
    );
  });

  /** @test */
  it('Displays "1 person registered" if 1 completed referral and 0 started', async () => {
    const completed = [userFactory()];

    renderVoterRegistrationReferrals({
      completed,
      started: [],
    });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You have registered 1 person so far.',
    );

    const completedReferrals = screen.getAllByTestId(
      'voter-registration-referral-completed',
    );

    expect(completedReferrals).toHaveLength(1);
    expect(
      within(completedReferrals[0]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(completed[0].displayName);
  });

  it('Displays "0 out of 2 people registered" if 0 completed referrals and 2 started', async () => {
    const started = [userFactory(), userFactory()];

    renderVoterRegistrationReferrals({
      completed: [],
      started,
    });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You have registered 0 out of 2 people so far.',
    );

    const startedReferrals = screen.getAllByTestId(
      'voter-registration-referral-started',
    );

    expect(startedReferrals).toHaveLength(2);
    expect(
      screen.queryByTestId('voter-registration-referral-completed'),
    ).toBeNull();
    expect(screen.queryByTestId('referrals-toggle')).toBeNull();
    expect(
      within(startedReferrals[0]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(started[0].displayName);
    expect(
      within(startedReferrals[1]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(started[1].displayName);
  });

  it('Displays "3 people registered" if 3 completed referrals and 0 started', async () => {
    const completed = [userFactory(), userFactory(), userFactory()];

    renderVoterRegistrationReferrals({
      completed,
      started: [],
    });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You have registered 3 people so far.',
    );

    const completedReferrals = screen.getAllByTestId(
      'voter-registration-referral-completed',
    );

    expect(completedReferrals).toHaveLength(3);
    expect(screen.queryByTestId('referrals-toggle')).toBeNull();
    expect(
      within(completedReferrals[0]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(completed[0].displayName);
    expect(
      within(completedReferrals[1]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(completed[1].displayName);
  });

  /** @test */
  it('Displays "3 out of 7 people registered" if 3 completed and 4 started, expands/collapses', async () => {
    const completed = [userFactory(), userFactory(), userFactory()];
    const started = [
      userFactory(),
      userFactory(),
      userFactory(),
      userFactory(),
    ];

    renderVoterRegistrationReferrals({
      completed,
      started,
    });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You have registered 3 out of 7 people so far.',
    );

    const completedReferrals = screen.getAllByTestId(
      'voter-registration-referral-completed',
    );

    expect(screen.getByTestId('referrals-toggle').textContent).toBe(
      '+ See More',
    );
    expect(completedReferrals).toHaveLength(3);
    expect(
      screen.queryByTestId('voter-registration-referral-started'),
    ).toBeNull();

    fireEvent.click(screen.getByTestId('referrals-toggle'));

    expect(screen.getByTestId('referrals-toggle').textContent).toBe(
      '+ See Less',
    );

    const startedReferrals = screen.getAllByTestId(
      'voter-registration-referral-started',
    );

    expect(startedReferrals).toHaveLength(4);
    expect(
      within(startedReferrals[0]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(started[0].displayName);
    expect(
      within(startedReferrals[1]).getByTestId(
        'voter-registration-referral-label',
      ).textContent,
    ).toBe(started[1].displayName);

    fireEvent.click(screen.getByTestId('referrals-toggle'));

    expect(
      screen.queryByTestId('voter-registration-referral-started'),
    ).toBeNull();
    expect(screen.getByTestId('referrals-toggle').textContent).toBe(
      '+ See More',
    );
  });
});
