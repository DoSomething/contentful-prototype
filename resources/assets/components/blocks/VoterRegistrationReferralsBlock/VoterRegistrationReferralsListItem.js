import React from 'react';
import PropTypes from 'prop-types';

import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferralsListItem = props => {
  const { label } = props;
  const isEmpty = label === '???';

  return (
    <div
      data-test={`referral-list-item-${!isEmpty ? 'completed' : 'empty'}`}
      className="text-center w-20 xs:w-24 sm:w-32 md:w-40"
    >
      <img
        className="mb-3"
        src={!isEmpty ? CompletedRegistrationImage : EmptyRegistrationImage}
        alt={
          !isEmpty ? 'Completed voter registration icon' : 'Empty circle icon'
        }
      />
      <p className={isEmpty ? 'text-gray-500' : null}>{label}</p>
    </div>
  );
};

VoterRegistrationReferralsListItem.propTypes = {
  label: PropTypes.string,
};

VoterRegistrationReferralsListItem.defaultProps = {
  label: '???',
};

export default VoterRegistrationReferralsListItem;
