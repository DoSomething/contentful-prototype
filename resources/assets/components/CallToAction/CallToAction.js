/* @flow */

import React from 'react';
import classnames from 'classnames';

import Card from '../Card';
import Button from '../Button/Button';
import SignupButtonFactory from '../SignupButton';

import './cta.scss';

const renderImpactContent = (prefix, value, suffix) => {
  const valueElem = <span className="cta__impact_number">{value}</span>;

  return (
    <div className="cta__impact margin-bottom-lg">
      { prefix ? `${prefix} ` : null } {valueElem} { suffix ? ` ${suffix}` : null }
    </div>
  );
};

type CallToActionProps = {
  actionText: ?string,
  campaignId: string,
  className: ?string,
  content: ?string,
  impactPrefix: ?string,
  impactSuffix: ?string,
  impactValue: ?string,
  hideIfSignedUp: ?bool,
  isSignedUp: bool,
  legacyCampaignId: ?string,
  tagline: string,
  useCampaignTagline: bool,
  visualStyle: string,
};

const CallToAction = ({
  actionText, campaignId, className, content, impactPrefix, impactSuffix, impactValue,
  hideIfSignedUp, isSignedUp, legacyCampaignId, tagline, useCampaignTagline, visualStyle,
}: CallToActionProps) => {
  if (hideIfSignedUp && isSignedUp) {
    return null;
  }

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <Button onClick={() => clickedSignUp(legacyCampaignId || campaignId)} text={actionText} />
  ), 'call to action', { text: actionText });

  return (
    <Card className={classnames('call-to-action rounded padded text-centered', className, {
      'bg-white bordered light': visualStyle === 'light',
      'bg-black dark': visualStyle === 'dark',
      'bg-transparent border-none transparent': visualStyle === 'transparent',
    })}
    >
      { useCampaignTagline ? <div className="cta__tagline margin-bottom-lg">{tagline}</div> : null }

      { impactValue ? renderImpactContent(impactPrefix, impactValue, impactSuffix) : null }

      { content ? <div className="cta__message margin-bottom-lg">{content}</div> : null }

      { isSignedUp ? null : <SignupButton /> }
    </Card>
  );
};

CallToAction.defaultProps = {
  actionText: 'Join us',
  className: null,
  content: null,
  impactPrefix: null,
  impactSuffix: null,
  impactValue: null,
  hideIfSignedUp: false,
  legacyCampaignId: null,
};

export default CallToAction;
