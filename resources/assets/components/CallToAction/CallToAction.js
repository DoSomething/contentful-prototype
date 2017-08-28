/* @flow */

import React from 'react';
import classnames from 'classnames';
import Button from '../Button/Button';
import './cta.scss';

type CallToActionProps = {
  clickedSignUp: (campaignId: string, metadata: ?{}) => mixed,
  legacyCampaignId: string,
  className: ?string,
};

const CallToAction = ({ clickedSignUp, legacyCampaignId, className }: CallToActionProps) => (
  <div className={classnames('call-to-action', className)}>
    <Button onClick={() => clickedSignUp(legacyCampaignId, { source: 'small screen sticky cta|text: Join us' })} />
  </div>
);

CallToAction.defaultProps = {
  className: null,
};

export default CallToAction;
