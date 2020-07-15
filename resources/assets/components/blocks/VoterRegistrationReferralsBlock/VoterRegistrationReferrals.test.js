import faker from 'faker';
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
  it('Does not display "X out of Y" text if completed referrals exist but none started', async () => {
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
  });
});
