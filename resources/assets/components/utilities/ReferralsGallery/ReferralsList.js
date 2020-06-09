import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import ReferralsListItem from './ReferralsListItem';

const ReferralsList = props => {
  const items = [];

  /**
   * If there are no posts, we want to display three empty list items, which is why
   * we're looping from 0 to 2 here (vs slicing our posts array).
   */
  for (let i = 0; i < 3; i += 1) {
    items.push(
      <li key={i} className="md:pr-6">
        <ReferralsListItem
          label={get(props.referrals[i], 'displayName')}
          referralIcon={props.referralIcon}
          placeholderIcon={props.placeholderIcon}
        />
      </li>,
    );
  }

  return <ul className="flex justify-around">{items}</ul>;
};

ReferralsList.propTypes = {
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
  referrals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReferralsList;
