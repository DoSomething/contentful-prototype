import React from 'react';
import PropTypes from 'prop-types';

const CampaignHeader = ({ title, subtitle }) => (
  <header
    role="banner"
    className="mb-3 col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-10 xxl:col-start-2 xxl:col-span-7"
  >
    <h1
      data-testid="campaign-header-title"
      className="uppercase text-xl text-blurple-700"
    >
      {title}
    </h1>

    <h2
      data-testid="campaign-header-subtitle"
      className="uppercase text-3xl md:text-4xl font-league-gothic font-normal"
    >
      {subtitle}
    </h2>
  </header>
);

CampaignHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CampaignHeader;
