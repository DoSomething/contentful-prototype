import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';

const renderHeader = (title, link) => (
  <header className="card__title">
    { link ? <h1><a href={link}>{title}</a></h1> : <h1>{title}</h1> }
  </header>
);

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const Card = ({ children, className = '', link = null, title = null, onClick }) => (
  <article className={classnames('card', className)} onClick={onClick}>
    { title ? renderHeader(title, link) : null }

    { children }
  </article>
);

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  className: null,
  link: null,
  onClick: () => {},
};

export default Card;
