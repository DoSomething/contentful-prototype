import React from 'react';
import PropTypes from 'prop-types';

import Header from './InfoHeader';

const ScholarshipActionType = ({ actionLabel }) => (
  <div className="lg:w-1/2 lg:float-right">
    <Header content="Action Type" />
    <p className="pb-2">{actionLabel}</p>
  </div>
);

ScholarshipActionType.propTypes = {
  actionLabel: PropTypes.string.isRequired,
};

export default ScholarshipActionType;
