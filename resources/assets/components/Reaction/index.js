import React from 'react';
import classnames from 'classnames';
import { BaseFigure } from '../Figure';
import './reaction.scss';

// @TODO: review the structure of the reaction button below, not ideal that it is an article tag
// with a button tag, enclosing another article tag!?

const Reaction = (props) => {
  const active = props.active;
  const total = props.total;

  const onToggle = ! active ? props.onToggleOn : props.onToggleOff;
  const reactionButton = <div className={classnames('reaction__button', { '-reacted': active })} />;

  return (
    <button className="reaction" onClick={onToggle}>
      <BaseFigure media={reactionButton} alignment="left">
        <span className="reaction__meta">{total}</span>
      </BaseFigure>
    </button>
  );
};

Reaction.propTypes = {
  active: React.PropTypes.bool,
  onToggleOff: React.PropTypes.func.isRequired,
  onToggleOn: React.PropTypes.func.isRequired,
  total: React.PropTypes.number,
};

Reaction.defaultProps = {
  active: false,
  total: 0,
};

export default Reaction;
