/* @flow */

import React from 'react';
import classnames from 'classnames';
import Button from '../Button/Button';
import SignupButtonFactory from '../SignupButton';
import './cta.scss';

type CallToActionProps = {
  legacyCampaignId: string,
  className: ?string,
};

const CallToAction = ({ legacyCampaignId, className }: CallToActionProps) => (
  <div className={classnames('call-to-action', className)}>
    { SignupButtonFactory(({ clickedSignUp }) => (
      <Button onClick={() => clickedSignUp(legacyCampaignId)} />
    ), 'call to action', { text: 'join us' })}
  </div>
);

CallToAction.defaultProps = {
  className: null,
};

export default CallToAction;
