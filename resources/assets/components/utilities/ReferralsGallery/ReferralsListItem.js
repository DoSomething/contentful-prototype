import React from 'react';
import PropTypes from 'prop-types';

const ReferralsListItem = props => {
  const { label, placeholderIcon, referralIcon } = props;
  const isEmpty = label === '???';

  return (
    <div
      data-testid={`referral-list-item-${!isEmpty ? 'completed' : 'empty'}`}
      className="text-center"
      style={{ maxWidth: 200 }}
    >
      <img
        className="mb-3"
        src={!isEmpty ? referralIcon : placeholderIcon}
        alt={!isEmpty ? 'Completed referral icon' : 'Empty icon'}
      />
      <p
        data-testid="referral-list-item-label"
        className={isEmpty ? 'text-gray-500' : null}
      >
        {label}
      </p>
    </div>
  );
};

ReferralsListItem.propTypes = {
  label: PropTypes.string,
  placeholderIcon: PropTypes.string.isRequired,
  referralIcon: PropTypes.string.isRequired,
};

ReferralsListItem.defaultProps = {
  label: '???',
};

export default ReferralsListItem;
