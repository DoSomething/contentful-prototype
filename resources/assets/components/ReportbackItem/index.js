import PropTypes from 'prop-types';
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
      <Figure className="reportback-item" image="" alt="Loading...">
        <BaseFigure media={reactionElement} alignment="right" className="padded">
          <h4>Loading…</h4>
          <p className="footnote">…</p>
        </BaseFigure>
      </Figure>
    );
  }

  // TODO: Don't hardcode cards
  return (
    <Figure className="reportback-item" image={url} alt={`${firstName}'s photo`}>
      <BaseFigure media={reactionElement} alignment="right" className="padded">
        {firstName ? <h4>{firstName}</h4> : null }
        {quantity ? <p className="footnote">{quantity} cards</p> : null }
        {caption ? <p>{caption}</p> : null }
      </BaseFigure>
    </Figure>
  );
};

ReportbackItem.propTypes = {
  id: PropTypes.string,
  caption: PropTypes.string,
  firstName: PropTypes.string,
  isFetching: PropTypes.bool,
  quantity: PropTypes.number,
  reaction: PropTypes.shape({
    id: PropTypes.string,
    reacted: PropTypes.bool,
    termId: PropTypes.string,
    total: PropTypes.number,
  }),
  toggleReactionOff: PropTypes.func,
  toggleReactionOn: PropTypes.func,
  url: PropTypes.string,
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
