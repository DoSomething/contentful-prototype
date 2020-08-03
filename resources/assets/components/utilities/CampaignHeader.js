import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CampaignHeader = ({ title, subtitle, textColor }) => (
  <header
    role="banner"
    className="mb-3 col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-10 xxl:col-start-2 xxl:col-span-7"
  >
    <h1
      data-testid="campaign-header-title"
      className={classnames(
        'uppercase text-xl',
        textColor || 'text-blurple-700',
      )}
    >
      {title}
    </h1>

    <h2
      data-testid="campaign-header-subtitle"
      className={classnames(
        'uppercase text-3xl md:text-4xl font-league-gothic font-normal',
        textColor,
      )}
    >
      {subtitle}
    </h2>
  </header>
);

CampaignHeader.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

CampaignHeader.defaultProps = {
  textColor: null,
};

export default CampaignHeader;
