import React from 'react';
import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import { ensureAuth, EMPTY_IMAGE } from '../../helpers';
import './reportback-item.scss';

const ReportbackItem = ({id, url, quantity, firstName, reaction, isFetching = false, isAuthenticated, toggleReactionOn, toggleReactionOff}) => {
  const reactionElement = isFetching ? null : (
    <Reaction active={reaction.reacted} total={reaction.total}
              onToggleOn={() => ensureAuth(isAuthenticated) && toggleReactionOn(id, reaction.termId)}
              onToggleOff={() => toggleReactionOff(id, reaction.id)} />
  );

  return (
    <Figure className="reportback-item" image={isFetching ? EMPTY_IMAGE : url} imageClassName={isFetching ? 'is-fetching' : null}>
      <BaseFigure media={reactionElement} alignment="right" className="padded">
        <h4>{isFetching ? '…' : firstName}</h4>
        <p className="footnote">{isFetching ? '…' : `${quantity} jeans`}</p>
      </BaseFigure>
    </Figure>
  );
};

export default ReportbackItem;
