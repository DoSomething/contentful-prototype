import React from 'react';
import PropTypes from 'prop-types';

import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';

const ReferralsSection = ({ referrerUserId }) => {
  // TODO: Display images and referral names.
  return (
    <React.Fragment>
      <ContentBlock
        title="Get 3 friends to register!"
        content="You have registered **1 person** so far."
        className="grid-wide"
      />
    </React.Fragment>
  );
};

ReferralsSection.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ReferralsSection;
