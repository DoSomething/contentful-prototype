import PropTypes from 'prop-types';
import React, { useState } from 'react';

import VoterRegistrationReferral from './VoterRegistrationReferral';

const VoterRegistrationReferrals = ({ completed, started }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  // Add completed referrals first.
  const referrals = completed.map((item, index) => (
    <VoterRegistrationReferral
      isCompleted
      isFirst={index === 0}
      key={item.id}
      label={item.displayName}
    />
  ));

  // Then append incomplete referrals.
  started.forEach((item, index) =>
    referrals.push(
      <VoterRegistrationReferral
        isFirst={completed.length === 0 && index === 0}
        key={item.id}
        label={item.displayName}
      />,
    ),
  );

  if (referrals.length < 4) {
    return referrals;
  }

  return (
    <>
      {expanded ? referrals : referrals.slice(0, 3)}

      <button
        type="button"
        onClick={handleToggle}
        className="underline text-blurple-500"
      >
        {expanded ? '+ See More' : '+ See Less'}
      </button>
    </>
  );
};

VoterRegistrationReferrals.propTypes = {
  completed: PropTypes.arrayOf(PropTypes.object),
  started: PropTypes.arrayOf(PropTypes.object),
};

VoterRegistrationReferrals.defaultProps = {
  completed: [],
  started: [],
};

export default VoterRegistrationReferrals;
