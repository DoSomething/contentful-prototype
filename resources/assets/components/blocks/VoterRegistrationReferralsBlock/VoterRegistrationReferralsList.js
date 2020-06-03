import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import VoterRegistrationReferralsListItem from './VoterRegistrationReferralsListItem';

const VoterRegistrationReferralsList = ({ referralPosts }) => {
  const items = [];

  /**
   * If there are no posts, we want to display three empty list items, which is why
   * we're looping from 0 to 2 here (vs slicing our posts array).
   */
  for (let i = 0; i < 3; i += 1) {
    items.push(
      <li key={i} className="md:pr-6">
        <VoterRegistrationReferralsListItem
          label={get(referralPosts[i], 'user.displayName')}
        />
      </li>,
    );
  }

  return <ul className="flex justify-around">{items}</ul>;
};

VoterRegistrationReferralsList.propTypes = {
  referralPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VoterRegistrationReferralsList;
