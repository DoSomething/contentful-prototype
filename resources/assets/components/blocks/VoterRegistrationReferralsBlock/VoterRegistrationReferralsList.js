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

  /**
   * We're using clearfix and float-left for non-small screens instead of flex, because the Figure
   * component within our VoterRegistrationReferralsListItem doesn't align left.
   * @see https://www.pivotaltracker.com/n/projects/2441250/stories/172608156
   */
  return <ul className="flex justify-around">{items}</ul>;
};

VoterRegistrationReferralsList.propTypes = {
  referralPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VoterRegistrationReferralsList;
