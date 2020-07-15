import faker from 'faker';
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import VoterRegistrationReferrals from './VoterRegistrationReferrals';

const renderVoterRegistrationReferrals = (completed, started) =>
  render(
    <VoterRegistrationReferrals completed={completed} started={started} />,
  );

describe('VoterRegistrationReferrals component', () => {
  /** @test */
  it('Displays help text if completed or started props are empty', async () => {
    renderVoterRegistrationReferrals([], []);

    expect(screen.getByTestId('referrals-count-description').textContent).toBe(
      'You haven’t helped anyone register to vote yet. Scroll down to get started!',
    );
  });
});
