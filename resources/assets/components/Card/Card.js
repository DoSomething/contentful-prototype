import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';

const renderHeader = (title, link) => (
  <header className="card__title">
    { link ? <h1><a href={link}>{title}</a></h1> : <h1>{title}</h1> }
  </header>
);

const Card = ({ children, className = '', link = null, title = null }) => (
  <article className={classnames('card', className)}>
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
};

Card.defaultProps = {
  className: null,
  link: null,
  title: null,
};

export default Card;
