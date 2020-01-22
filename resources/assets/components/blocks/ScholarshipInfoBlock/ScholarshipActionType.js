import React from 'react';
import PropTypes from 'prop-types';

import PlaceholderText from '../../utilities/PlaceholderText/PlaceholderText';

const ScholarshipActionType = ({ actionLabel, isLoaded }) => (
  <>
    {isLoaded && actionLabel ? (
      <div className="lg:w-1/2 lg:float-right">
        <div className="font-bold uppercase text-gray-600">Action Type</div>
        <p className="pb-2">{actionLabel}</p>
      </div>
    ) : (
      <PlaceholderText size="medium" />
    )}
  </>
);

ScholarshipActionType.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default ScholarshipActionType;
