/* @flow */

import React from 'react';
import classnames from 'classnames';
import Button from '../Button/Button';
import './cta.scss';

type CallToActionProps = {
  clickedSignUp: (campaignId: string, metadata: ?{}) => mixed,
  legacyCampaignId: string,
  classNames?: string,
};

const CallToAction = ({ clickedSignUp, legacyCampaignId, classNames = '' }: CallToActionProps) => (
  <div className={classnames('call-to-action', classNames)}>
    <Button onClick={() => clickedSignUp(legacyCampaignId, { source: 'small screen sticky cta|text: Join us' })} />
  </div>
);

CallToAction.defaultProps = {
  classNames: '',
};

export default CallToAction;
