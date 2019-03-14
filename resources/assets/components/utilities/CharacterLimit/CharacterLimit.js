import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CharacterLimit = ({ text, limit }) => {
  const remaining = Math.max(limit - text.length, 0);

  return (
    <p className={classNames('footnote', { 'color-error': remaining === 0 })}>
      {remaining} characters remaining
    </p>
  );
};

CharacterLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default CharacterLimit;
