import React from 'react';
import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import './reportback-item.scss';

const ReportbackItem = (props) => {
  const {
    id,
    url,
    quantity,
    caption,
    firstName,
    reaction = null,
    isFetching = false,
    isAuthenticated,
    toggleReactionOn,
    toggleReactionOff
  } = props;

  if (isFetching) {
    return (
      <Figure className="reportback-item" image="">
        <BaseFigure media={reactionElement} alignment="right" className="padded">
          <h4>Loading…</h4>
          <p className="footnote">…</p>
        </BaseFigure>
      </Figure>
    );
  }

  const reactionElement = reaction && !isFetching ? (
    <Reaction active={reaction.reacted} total={reaction.total}
              onToggleOn={() => toggleReactionOn(id, reaction.termId, props)}
              onToggleOff={() => toggleReactionOff(id, reaction.id, props)} />
  ) : null;

  return (
    <Figure className="reportback-item" image={url}>
      <BaseFigure media={reactionElement} alignment="right" className="padded">
        {firstName ? <h4>{firstName}</h4> : null }
        {quantity ? <p className="footnote">{quantity} jeans</p> : null }
        {caption ?  <p>{caption}</p> : null }
      </BaseFigure>
    </Figure>
  );
};

export default ReportbackItem;
