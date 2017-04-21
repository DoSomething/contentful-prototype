import PropTypes from 'prop-types';
import React from 'react';
import './highlight.scss';

const Highlight = ({ children }) => <h1 className="highlight">{ children }</h1>;

Highlight.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Highlight;
