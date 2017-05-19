import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import Markdown from '../Markdown';
import { contentfulImageUrl } from '../../helpers';

import './lede-banner.scss';

const LedeBanner = ({
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    legacyCampaignId,
    clickedSignUp,
    noun,
    verb,
    experiments,
  }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  const onClick = message => clickedSignUp(legacyCampaignId, message);

  // @TEST 2017-05-17 lede_banner_number_of_buttons
  const submissionActions = () => {
    const buttonCount = get(experiments, 'lede_banner_number_of_buttons', null);

    if (buttonCount === 'two_buttons') {
      return (
        <ul className="button-group">
          <li><button className="button" onClick={() => onClick({ source: 'lede banner|text: Support the cause' })}>Support the cause</button></li>
          <li><button className="button" onClick={() => onClick({ source: 'lede banner|text: Custom noun & verb' })}>{verb.plural} {noun.plural}</button></li>
        </ul>
      );
    }

    return (
      <button className="button" onClick={() => onClick({ source: 'lede banner|text: Join us' })}>Join us</button>
    );
  };

  return (
    <header role="banner" className="lede-banner">
      <div className="lede-banner__image" style={backgroundImageStyle} />
      <div className="lede-banner__content">
        <div className="wrapper">
          <div className="lede-banner__headline">
            <h1 className="lede-banner__headline-title">{title}</h1>
            <h2 className="lede-banner__headline-subtitle">{subtitle}</h2>
          </div>

          <Markdown className="lede-banner__blurb">{blurb}</Markdown>

          { isAffiliated ? null : submissionActions() }
        </div>
      </div>
    </header>
  );
};

LedeBanner.propTypes = {
  blurb: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  experiments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isAffiliated: PropTypes.bool.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

LedeBanner.defaultProps = {
  experiments: null,
  noun: { singular: 'action', plural: 'action' },
  verb: { singular: 'take', plural: 'take' },
};

export default LedeBanner;
