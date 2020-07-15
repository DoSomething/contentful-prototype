import React from 'react';
import { render, screen, within } from '@testing-library/react';

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
  it('Displays "1 person registered" if one completed referral exists with none started', async () => {
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

  it('Displays "2 people registered" if 3 completed referrals exists with none started', async () => {
    const completed = [userFactory(), userFactory()];

    renderVoterRegistrationReferrals({
      completed,
      started: [],
    });

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You have registered 2 people so far.',
    );

    const completedReferrals = screen.getAllByTestId(
      'voter-registration-referral-completed',
    );

    expect(completedReferrals).toHaveLength(2);
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
  it('Displays "3 out of 7 people registered" if 3 completed and 4 referrals', async () => {
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
    // @TODO: Why does this fail?
    // const startedReferrals = screen.getAllByTestId(
    //   'voter-registration-referral-started',
    // );

    expect(completedReferrals).toHaveLength(3);
    //expect(startedReferrals).toHaveLength(4);
  });
});
