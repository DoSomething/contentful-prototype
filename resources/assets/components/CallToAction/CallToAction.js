import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../utilities/Card/Card';
import { isScholarshipAffiliateReferral } from '../../helpers';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../constants';
import SignupButtonContainer from '../SignupButton/SignupButtonContainer';

import './cta.scss';

export const CallToActionBlockFragment = gql`
  fragment CallToActionBlockFragment on CallToActionBlock {
    visualStyle
    useCampaignTagline
    content
    impactPrefix
    impactValue
    impactSuffix
    actionText
  }
`;

const renderImpactContent = (prefix, value, suffix) => {
  const valueElem = <span className="cta__impact_number">{value}</span>;

  return (
    <div className="cta__impact mb-6">
      {prefix ? `${prefix} ` : null} {valueElem} {suffix ? ` ${suffix}` : null}
    </div>
  );
};

const CallToAction = ({
  className,
  content,
  impactPrefix,
  impactSuffix,
  impactValue,
  hideIfSignedUp,
  isSignedUp,
  sticky,
  tagline,
  useCampaignTagline,
  visualStyle,
}) => {
  if (hideIfSignedUp && isSignedUp) {
    return null;
  }

  return (
    <Card
      className={classnames('p-3 text-center', className, {
        'bg-white bordered light': visualStyle === 'light',
        'bg-black dark': visualStyle === 'dark',
        'bg-transparent border-0 transparent': visualStyle === 'transparent',
      })}
    >
      {useCampaignTagline ? <div className="mb-6">{tagline}</div> : null}

      {impactValue
        ? renderImpactContent(impactPrefix, impactValue, impactSuffix)
        : null}

      {content ? <div className="max-w-lg mb-6 mx-auto">{content}</div> : null}

      {isSignedUp ? null : (
        <SignupButtonContainer
          text={
            isScholarshipAffiliateReferral()
              ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
              : undefined
          }
        />
      )}
    </Card>
  );
};

CallToAction.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  impactPrefix: PropTypes.string,
  impactSuffix: PropTypes.string,
  impactValue: PropTypes.string,
  hideIfSignedUp: PropTypes.bool,
  isSignedUp: PropTypes.bool.isRequired,
  sticky: PropTypes.bool,
  tagline: PropTypes.string.isRequired,
  useCampaignTagline: PropTypes.bool,
  visualStyle: PropTypes.string,
};

CallToAction.defaultProps = {
  className: null,
  content: null,
  impactPrefix: null,
  impactSuffix: null,
  impactValue: null,
  hideIfSignedUp: false,
  sticky: false,
  useCampaignTagline: false,
  visualStyle: null,
};

export default CallToAction;
