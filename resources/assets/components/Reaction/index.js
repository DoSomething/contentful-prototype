import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { BaseFigure } from '../Figure';
import './reaction.scss';

// @TODO: review the structure of the reaction button below, not ideal that it is an article tag
// with a button tag, enclosing another article tag!?

const Reaction = props => {
  const active = props.active;
  const total = props.total;

  const onToggle = !active ? props.onToggleOn : props.onToggleOff;
  const reactionButton = (
    <div className={classnames('reaction__button', { '-reacted': active })} />
  );

  return (
    <button className="reaction" onClick={onToggle}>
      <BaseFigure
        media={reactionButton}
        alignment="left"
        className="margin-bottom-none"
      >
        <span className="reaction__meta">{total}</span>
      </BaseFigure>
    </button>
  );
};

Reaction.propTypes = {
  active: PropTypes.bool,
  onToggleOff: PropTypes.func.isRequired,
  onToggleOn: PropTypes.func.isRequired,
  total: PropTypes.number,
};

Reaction.defaultProps = {
  active: false,
  total: 0,
};

export default Reaction;
