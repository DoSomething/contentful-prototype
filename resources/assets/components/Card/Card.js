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

const Card = (props) => {
  const {
    children, className, closeModal, link,
    title, onClose, withinModal,
  } = props;

  let cardCloseFunction = onClose;

  // If this card is in a modal, and we haven't specified an onClose function already,
  // set the button to close the modal.
  if (! onClose && withinModal && closeModal) {
    cardCloseFunction = closeModal;
  }

  return (
    <article className={classnames('card', className)}>
      { title ? renderHeader(title, link, cardCloseFunction) : null }

      { children }
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  closeModal: PropTypes.func,
  link: PropTypes.string,
  onClose: PropTypes.func,
  title: PropTypes.string,
  withinModal: PropTypes.bool,
};

Card.defaultProps = {
  className: null,
  closeModal: null,
  link: null,
  onClose: null,
  title: null,
  withinModal: false,
};

export default Card;
