import React from 'react';
import PropTypes from 'prop-types';

const SiteNavigationFeature = ({
  callback,
  imageSrc,
  imageAlt,
  moreLinkText,
  text,
  title,
  url,
}) => (
  <a href={url} className="main-subnav__feature" onClick={callback}>
    <img className="mb-4" src={imageSrc} alt={imageAlt} />

    <h1 className="main-subnav__feature-title">{title}</h1>

    <div className="main-subnav__feature-content">
      <p>{text}</p>

      <p className="main-subnav__feature-link">{moreLinkText}</p>
    </div>
  </a>
);

SiteNavigationFeature.propTypes = {
  callback: PropTypes.func,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  moreLinkText: PropTypes.string,
  url: PropTypes.string.isRequired,
};

SiteNavigationFeature.defaultProps = {
  callback: () => {},
  moreLinkText: 'Learn More',
};

export default SiteNavigationFeature;
