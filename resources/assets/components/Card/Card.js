import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';

const renderHeader = (title, link, onClose) => (
  <header className="card__title">
    { link ? <h1><a href={link}>{title}</a></h1> : <h1>{title}</h1> }
    { onClose ? <button className="card__exit" onClick={onClose}>&times;</button> : null }
  </header>
);

const Card = ({ children, className = '', link = null, title = null, onClose }) => (
  <article className={classnames('card', className)}>
    { title ? renderHeader(title, link, onClose) : null }

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
  onClose: PropTypes.func,
  title: PropTypes.string,
};

Card.defaultProps = {
  className: null,
  link: null,
  onClose: null,
  title: null,
};

export default Card;
