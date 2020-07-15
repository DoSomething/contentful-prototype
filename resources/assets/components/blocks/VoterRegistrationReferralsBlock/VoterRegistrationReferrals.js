import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import VoterRegistrationReferral from './VoterRegistrationReferral';

const VoterRegistrationReferrals = ({ completed, started }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  // Display completed referrals first.
  const referrals = completed
    .concat(started)
    .map((item, index) => (
      <VoterRegistrationReferral
        isCompleted={index < completed.length}
        isFirst={index === 0}
        key={item.id}
        label={item.displayName}
      />
    ));

  if (!referrals.length) {
    return (
      <div className="md:w-2/3" data-testid="referrals-count-description">
        You haven’t helped anyone register to vote yet. Scroll down to get
        started!
      </div>
    );
  }

  return (
    <div className="md:w-2/3">
      <div className="pb-3" data-testid="referrals-count-description">
        You have registered{' '}
        <strong>
          {started.length
            ? `${completed.length} out of ${referrals.length}`
            : completed.length}{' '}
          {pluralize('person', referrals.length)}
        </strong>{' '}
        so far.
      </div>

      {expanded ? referrals : referrals.slice(0, 3)}

      {referrals.length > 3 ? (
        <button
          type="button"
          onClick={handleToggle}
          className="underline text-blurple-500"
        >
          {expanded ? '+ See More' : '+ See Less'}
        </button>
      ) : null}
    </div>
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
