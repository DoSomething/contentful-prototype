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
    <div data-test={`referral-list-item-${!isEmpty ? 'completed' : 'empty'}`}>
      <BaseFigure media={media} size="medium">
        <p className={isEmpty ? 'text-gray-500' : null}>{label}</p>
      </BaseFigure>
    </div>
  );
};

ReferralsListItem.propTypes = {
  label: PropTypes.string,
};

ReferralsListItem.defaultProps = {
  label: '???',
};

export default ReferralsListItem;
