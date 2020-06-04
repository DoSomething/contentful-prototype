import faker from 'faker';
import React from 'react';
import { render, screen, within } from '@testing-library/react';

import ReferralsGallery from './ReferralsGallery';

const renderReferralsGallery = referrals =>
  render(
    <ReferralsGallery
      referrals={referrals}
      placeholderIcon={faker.image.dataUri()}
      referralIcon={faker.image.dataUri()}
    />,
  );

describe('ReferralGallery component', () => {
  /** @test */
  it('Displays three empty icons if there are no referrals', async () => {
    renderReferralsGallery([]);

    expect(screen.getAllByTestId('referral-list-item-empty')).toHaveLength(3);
    expect(screen.queryByTestId('referral-list-item-completed')).toBeNull();
    expect(screen.queryByTestId('additional-referrals-count')).toBeNull();
  });

  /** @test */
  it('Displays 2 completed icons there are 2 referrals', () => {
    renderReferralsGallery([
      { displayName: 'Jesus Q.' },
      { displayName: 'Walter S.' },
    ]);

    const referralItems = screen.getAllByTestId('referral-list-item-completed');

    expect(referralItems).toHaveLength(2);

    expect(
      within(referralItems[0]).getByTestId('referral-list-item-label')
        .textContent,
    ).toBe('Jesus Q.');

    expect(
      within(referralItems[1]).getByTestId('referral-list-item-label')
        .textContent,
    ).toBe('Walter S.');

    expect(screen.getAllByTestId('referral-list-item-empty')).toHaveLength(1);
    expect(screen.queryByTestId('additional-referrals-count')).toBeNull();
  });

  /** @test */
  it('Displays 3 completed icons and additional count if user has 5 referrals', () => {
    renderReferralsGallery([
      { displayName: 'Sarah C.' },
      { displayName: 'Kyle R.' },
      { displayName: 'John C.' },
      { displayName: 'Miles D.' },
      { displayName: 'Tarissa D.' },
    ]);

    const referralItems = screen.getAllByTestId('referral-list-item-completed');
    expect(referralItems).toHaveLength(3);

    expect(
      within(referralItems[0]).getByTestId('referral-list-item-label')
        .textContent,
    ).toBe('Sarah C.');

    expect(
      within(referralItems[1]).getByTestId('referral-list-item-label')
        .textContent,
    ).toBe('Kyle R.');

    expect(
      within(referralItems[2]).getByTestId('referral-list-item-label')
        .textContent,
    ).toBe('John C.');

    expect(screen.queryByTestId('referral-list-item-empty')).toBeNull();
    expect(screen.getByTestId('additional-referrals-count').textContent).toBe(
      '+ 2 more',
    );
  });
});
