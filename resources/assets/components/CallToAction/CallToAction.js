import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../utilities/Card/Card';
import { isScholarshipAffiliateReferral } from '../../helpers';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../constants';
import SignupButtonContainer from '../SignupButton/SignupButtonContainer';

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
  const valueElem = (
    <span className="block font-league-gothic font-normal text-4xl">
      {value}
    </span>
  );

  return (
    <div className="font-bold mb-6 uppercase">
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
        'bg-white border border-solid border-gray-200 rounded':
          visualStyle === 'light',
        'bg-black-important rounded text-white': visualStyle === 'dark',
      })}
    >
      {useCampaignTagline ? (
        <div
          className={classnames('font-bold mb-6', {
            'text-yellow-500': visualStyle === 'dark',
          })}
        >
          {tagline}
        </div>
      ) : null}

      {impactValue
        ? renderImpactContent(impactPrefix, impactValue, impactSuffix)
        : null}

      {content ? (
        <div
          className={classnames('max-w-lg mb-6 mx-auto', {
            italic: visualStyle === 'light',
          })}
        >
          {content}
        </div>
      ) : null}

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
  useCampaignTagline: false,
  visualStyle: null,
};

export default CallToAction;
