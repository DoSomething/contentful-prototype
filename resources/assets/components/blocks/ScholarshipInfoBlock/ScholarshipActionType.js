import React from 'react';
import PropTypes from 'prop-types';

import Header from './InfoHeader';

const ScholarshipActionType = ({ actionLabel }) => (
  <div>
    <Header content="Action Type" />
    <p className="pb-2">{actionLabel}</p>
  </div>
);

export default ScholarshipActionType;

ScholarshipActionType.propTypes = {
  actionLabel: PropTypes.string.isRequired,
};
