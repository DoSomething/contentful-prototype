import React from 'react';
import PropTypes from 'prop-types';

import EmptyRegistrationImage from './empty-registration.svg';
import { BaseFigure } from '../../../../utilities/Figure/Figure';
import CompletedRegistrationImage from './completed-registration.svg';

const ReferralsListItem = props => {
  const { label } = props;

  const media = (
    <img
      src={label ? CompletedRegistrationImage : EmptyRegistrationImage}
      alt={label ? 'Completed voter registration icon' : 'Empty circle icon'}
    />
  );

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
