import React from 'react';
import PropTypes from 'prop-types';

import VoterRegistrationImage from './registration.svg';
import { BaseFigure } from '../../../../utilities/Figure/Figure';

const ReferralsListItem = props => {
  const { label } = props;

  const media = <img src={VoterRegistrationImage} alt="Registered to vote" />;

  return (
    <BaseFigure media={media} size="medium">
      <p>{label || '???'}</p>
    </BaseFigure>
  );
};

ReferralsListItem.propTypes = {
  label: PropTypes.string,
};

ReferralsListItem.defaultProps = {
  label: null,
};

export default ReferralsListItem;
