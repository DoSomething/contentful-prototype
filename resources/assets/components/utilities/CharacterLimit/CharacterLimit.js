import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CharacterLimit = ({ className, text, limit }) => {
  const remaining = limit - text.length;

  return (
    <p
      className={classNames(className, 'footnote', {
        'color-error': remaining <= 0,
      })}
    >
      {remaining} characters remaining
    </p>
  );
};

CharacterLimit.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

CharacterLimit.defaultProps = {
  className: null,
};

export default CharacterLimit;
