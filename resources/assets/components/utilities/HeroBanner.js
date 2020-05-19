import React from 'react';
import PropTypes from 'prop-types';

const HeroBanner = ({ title, subtitle }) => (
  <header
    role="banner"
    className="mb-3 col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-8 xxl:col-start-2 xxl:col-span-7"
  >
    <h1 className="uppercase text-xl text-blurple-700">{title}</h1>
    <h2 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
      {subtitle}
    </h2>
  </header>
);

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default HeroBanner;
