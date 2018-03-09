/* @flow */

import React from 'react';
import classnames from 'classnames';

import Card from '../Card';
import SignupButton from '../SignupButton';

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
  className: ?string,
  content: ?string,
  impactPrefix: ?string,
  impactSuffix: ?string,
  impactValue: ?string,
  hideIfSignedUp: ?bool,
  isSignedUp: bool,
  sticky: ?bool,
  tagline: string,
  useCampaignTagline: bool,
  visualStyle: string,
};

const CallToAction = ({
  className, content, impactPrefix, impactSuffix, impactValue,
  hideIfSignedUp, isSignedUp, sticky, tagline, useCampaignTagline, visualStyle,
}: CallToActionProps) => {
  if (hideIfSignedUp && isSignedUp) {
    return null;
  }

  return (
    <Card className={classnames('call-to-action rounded padded text-centered', className, {
      '-sticky': sticky,
      'bg-white bordered light': visualStyle === 'light',
      'bg-black dark': visualStyle === 'dark',
      'bg-transparent border-none transparent': visualStyle === 'transparent',
    })}
    >
      { useCampaignTagline ? <div className="cta__tagline margin-bottom-lg">{tagline}</div> : null }

      { impactValue ? renderImpactContent(impactPrefix, impactValue, impactSuffix) : null }

      { content ? <div className="cta__message margin-bottom-lg">{content}</div> : null }

      { isSignedUp ? null : <SignupButton source="call to action" /> }
    </Card>
  );
};

CallToAction.defaultProps = {
  className: null,
  content: null,
  impactPrefix: null,
  impactSuffix: null,
  impactValue: null,
  hideIfSignedUp: false,
  sticky: false,
};

export default CallToAction;
