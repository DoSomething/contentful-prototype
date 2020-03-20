import React from 'react';
import PropTypes from 'prop-types';

const CausePreferenceItem = ({
  cause,
  description,
  title,
  userCauses,
  userId,
}) => {
  console.log('cause:', cause, 'user id:', userId, 'userCauses:', userCauses);
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

CausePreferenceItem.propTypes = {
  cause: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  userCauses: PropTypes.instanceOf(Array).isRequired,
  userId: PropTypes.string.isRequired,
};

CausePreferenceItem.defaultProps = {
  description: null,
  title: null,
};

export default CausePreferenceItem;
