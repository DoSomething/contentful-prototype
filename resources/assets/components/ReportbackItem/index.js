import React from 'react';
import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import { mergeMetadata } from '../../helpers/analytics';
import './reportback-item.scss';

function getMetadataFromProps(props) {
  return {
    itemId: props.id,
    quantity: props.quantity,
    totalReactions: props.reaction ? props.reaction.total : null,
    reportbackId: props.reportback ? props.reportback.id : null,
    reportbackUser: props.reportback ? props.reportback.user : null,
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
    toggleReactionOn,
    toggleReactionOff,
  } = props;

  const metadata = mergeMetadata(ReportbackItem.defaultMetadata, getMetadataFromProps(props));

  const reactionElement = reaction ? (
    <Reaction
      active={reaction.reacted}
      total={reaction.total}
      onToggleOn={() => toggleReactionOn(id, reaction.termId, metadata)}
      onToggleOff={() => toggleReactionOff(id, reaction.id, metadata)}
    />
  ) : null;

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

  // TODO: Don't hardcode cards
  return (
    <Figure className="reportback-item" image={url}>
      <BaseFigure media={reactionElement} alignment="right" className="padded">
        {firstName ? <h4>{firstName}</h4> : null }
        {quantity ? <p className="footnote">{quantity} cards</p> : null }
        {caption ? <p>{caption}</p> : null }
      </BaseFigure>
    </Figure>
  );
};

ReportbackItem.propTypes = {
  id: React.PropTypes.string,
  caption: React.PropTypes.string,
  firstName: React.PropTypes.string,
  isFetching: React.PropTypes.bool,
  quantity: React.PropTypes.number,
  reaction: React.PropTypes.shape({
    id: React.PropTypes.string,
    reacted: React.PropTypes.bool,
    termId: React.PropTypes.string,
    total: React.PropTypes.number,
  }),
  toggleReactionOff: React.PropTypes.func,
  toggleReactionOn: React.PropTypes.func,
  url: React.PropTypes.string,
};

ReportbackItem.defaultProps = {
  id: undefined,
  caption: undefined,
  firstName: undefined,
  isFetching: false,
  quantity: undefined,
  reaction: null,
  url: undefined,
  toggleReactionOff: () => {},
  toggleReactionOn: () => {},
};

ReportbackItem.defaultMetadata = {
  source: 'reportback item',
};

export default ReportbackItem;
