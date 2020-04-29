import React from 'react';
import PropTypes from 'prop-types';

import EmptyRegistrationImage from './empty-registration.svg';
import { BaseFigure } from '../../../../utilities/Figure/Figure';
import CompletedRegistrationImage from './completed-registration.svg';

const ReferralsListItem = props => {
  const { label } = props;
  const isEmpty = label === '???';

  const media = (
    <img
      src={!isEmpty ? CompletedRegistrationImage : EmptyRegistrationImage}
      alt={!isEmpty ? 'Completed voter registration icon' : 'Empty circle icon'}
    />
  );

  return (
    <BaseFigure
      media={media}
      size="medium"
      className={
        !isEmpty ? 'referral-list-item-completed' : 'referral-list-item-empty'
      }
    >
      <p className="referral-list-item-label">{label}</p>
    </BaseFigure>
  );
};

ReferralsListItem.propTypes = {
  label: PropTypes.string,
};

ReferralsListItem.defaultProps = {
  label: '???',
};

export default ReferralsListItem;
