import faker from 'faker';
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import ReferralsGallery from './ReferralsGallery';

const renderReferralsGallery = referralLabels =>
  render(
    <ReferralsGallery
      referralLabels={referralLabels}
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
    renderReferralsGallery(['Jesus Q.', 'Walter S.']);

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
      'Sarah C.',
      'Kyle R.',
      'John C.',
      'Miles D.',
      'Tarissa D.',
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

  /** @test */
  it('Expands/collapses the gallery when the additional count link is clicked', () => {
    renderReferralsGallery([
      'Sarah C.',
      'Kyle R.',
      'John C.',
      'Miles D.',
      'Tarissa D.',
    ]);

    fireEvent.click(screen.getByTestId('additional-referrals-count'));

    let referralItems = screen.getAllByTestId('referral-list-item-completed');
    expect(referralItems).toHaveLength(5);

    expect(screen.getByTestId('additional-referrals-count').textContent).toBe(
      '- show less',
    );

    fireEvent.click(screen.getByTestId('additional-referrals-count'));

    referralItems = screen.getAllByTestId('referral-list-item-completed');
    expect(referralItems).toHaveLength(3);

    expect(screen.getByTestId('additional-referrals-count').textContent).toBe(
      '+ 2 more',
    );
  });
});
