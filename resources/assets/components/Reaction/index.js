import React from 'react';
import './reaction.scss';
import classnames from 'classnames';

const Reaction = (props) => {
  const active = props.active || false;
  const total = props.total || 0;

  const onToggle = () => !active ? props.onToggleOn() : props.onToggleOff();

  return (
    <div className="reaction" onClick={onToggle}>
      <div className={classnames('reaction__button', {'-reacted' : active})}></div>
      <div className="reaction__meta">
        <p>{total}</p>
      </div>
    </div>
  );
};

module.exports = Reaction;
