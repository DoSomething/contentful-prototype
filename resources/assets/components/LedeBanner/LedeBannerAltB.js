import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import { contentfulImageUrl } from '../../helpers';

import './lede-banner.scss';

const LedeBannerAltB = (props) => {
  const {
    title,
    subtitle,
    blurb,
    coverImage,
    isAffiliated,
    legacyCampaignId,
    clickedSignUp,
    experiment,
    convert,
    noun,
    verb,
  } = props;

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(coverImage.url, '800', '600', 'fill')})`,
  };

  const onClick = (message) => {
    convert(experiment);
    clickedSignUp(legacyCampaignId, message);
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

          { isAffiliated ? null : <button className="button" onClick={() => onClick({ source: 'lede banner|A2|text: Custom noun & verb' })}>{verb.plural} {noun.plural}</button> }
        </div>
      </div>
    </header>
  );
};

LedeBannerAltB.propTypes = {
  blurb: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  convert: PropTypes.func.isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  experiment: PropTypes.string.isRequired,
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

LedeBannerAltB.defaultProps = {
  noun: { singular: 'action', plural: 'action' },
  verb: { singular: 'take', plural: 'take' },
};

export default LedeBannerAltB;
