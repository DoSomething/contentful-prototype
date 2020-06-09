import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReferralsListItem from './ReferralsListItem';

const ReferralsList = ({
  expanded,
  placeholderIcon,
  referralIcon,
  referrals,
}) => {
  const items = [];

  /**
   * If there are no referrals, we want to display three empty list items, which is why
   * we're looping from 0 to 2 here (vs slicing our referrals array).
   *
   * If the gallery is expanded - which implies that we have more than three referrals - we'll simply display them all.
   */
  for (let i = 0; i < (expanded ? referrals.length : 3); i += 1) {
    items.push(
      <li key={i} className={classNames({ 'md:w-40': !expanded })}>
        <ReferralsListItem
          label={get(referrals[i], 'displayName')}
          referralIcon={referralIcon}
          placeholderIcon={placeholderIcon}
        />
      </li>,
    );
  }

  return (
    <ul
      className={classNames('grid gap-3 grid-cols-3', {
        'md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6': expanded,
      })}
    >
      {items}
    </ul>
  );
};

ReferralsList.propTypes = {
  expanded: PropTypes.bool,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
  referrals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ReferralsList.defaultProps = {
  expanded: false,
};

export default ReferralsList;
