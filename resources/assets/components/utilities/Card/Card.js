import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderHeader = (title, link, onClose) => (
  <header className="text-gray-900 bg-yellow-500 p-3 rounded-t clip-padding-box">
    <h1 className="inline font-source-sans text-base uppercase">
      {link ? (
        <a
          className="text-gray-900 hover:opacity-75 hover:no-underline"
          href={link}
        >
          {title}
        </a>
      ) : (
        title
      )}
    </h1>
    {onClose ? (
      <button
        type="button"
        className="float-right text-xl -mt-2 hover:cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>
    ) : null}
  </header>
);

const Card = ({
  children,
  className = '',
  link = null,
  title = null,
  onClose,
}) => (
  <article
    className={classnames('card bg-white w-full clip-padding-box', className)}
  >
    {title ? renderHeader(title, link, onClose) : null}

    {children}
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
