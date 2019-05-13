import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../utilities/Card/Card';
import SignupButton from '../SignupButton';

import './cta.scss';

const renderImpactContent = (prefix, value, suffix) => {
  const valueElem = <span className="cta__impact_number">{value}</span>;

  return (
    <div className="cta__impact margin-bottom-lg">
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
      className={classnames(
        'call-to-action rounded padded text-center',
        className,
        {
          '-sticky': sticky,
          'bg-white bordered light': visualStyle === 'light',
          'bg-black dark': visualStyle === 'dark',
          'bg-transparent border-none transparent':
            visualStyle === 'transparent',
        },
      )}
    >
      {useCampaignTagline ? (
        <div className="cta__tagline margin-bottom-lg">{tagline}</div>
      ) : null}

      {impactValue
        ? renderImpactContent(impactPrefix, impactValue, impactSuffix)
        : null}

      {content ? (
        <div className="cta__message margin-bottom-lg">{content}</div>
      ) : null}

      {isSignedUp ? null : <SignupButton source="call to action" />}
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
  useCampaignTagline: PropTypes.bool.isRequired,
  visualStyle: PropTypes.string.isRequired,
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
