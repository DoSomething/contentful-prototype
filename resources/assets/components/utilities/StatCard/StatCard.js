import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ backgroundColor, title, number, link }) => (
  <div
    className="rounded p-3"
    style={{ backgroundColor }}
    data-testid="stat-card"
  >
    <p className="text-white text-lg font-bold uppercase">{title}</p>

    <p className="text-white text-5xl font-league-gothic -mt-3">
      {number.toLocaleString()}
    </p>

    <a
      className="text-white hover:text-white font-normal underline cursor-pointer"
      href={link.url}
    >
      {link.text}
    </a>
  </div>
);

StatCard.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatCard;
