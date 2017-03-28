import React from 'react';
import './reaction.scss';
import { BaseFigure } from '../Figure';
import classnames from 'classnames';

const Reaction = (props) => {
  const active = props.active || false;
  const total = props.total || 0;

  const onToggle = !active ? props.onToggleOn : props.onToggleOff;
  const reactionButton = <div className={classnames('reaction__button', {'-reacted' : active})} />;

  return (
    <div className="reaction" onClick={onToggle}>
      <BaseFigure media={reactionButton} alignment="left">
        <span className="reaction__meta">{total}</span>
      </BaseFigure>
    </div>
  );
};

export default Reaction;
