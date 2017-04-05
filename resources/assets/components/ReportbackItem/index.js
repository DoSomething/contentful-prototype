import React from 'react';
import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import { mergeMetadata } from '../../helpers/analytics';
import './reportback-item.scss';

function getMetadataFromProps(props) {
  return {
    itemId: props.id,
    quantity: props.quantity,
    totalReactions: props.reaction.total,
    reportbackId: props.reportback.id,
    reportbackUser: props.reportback.user,
  };
}

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

  const metadata = mergeMetadata(ReportbackItem.defaultMetadata, getMetadataFromProps(props));

  const reactionElement = reaction && !isFetching ? (
    <Reaction active={reaction.reacted} total={reaction.total}
              onToggleOn={() => toggleReactionOn(id, reaction.termId, metadata)}
              onToggleOff={() => toggleReactionOff(id, reaction.id, metadata)} />
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

ReportbackItem.defaultMetadata = {
  source: 'reportback item',
}

export default ReportbackItem;
