import PropTypes from 'prop-types';
import React from 'react';
import { Figure, BaseFigure, ReportbackFigure } from '../Figure';
import Reaction from '../Reaction';
import { pluralize } from '../../helpers';
import './reportback-item.scss';

// TODO: Use this for the puck connection.
//
// function getMetadataFromProps(props) {
//   return {
//     itemId: props.id,
//     quantity: props.quantity,
//     totalReactions: props.reaction ? props.reaction.total : null,
//     reportbackId: props.reportback ? props.reportback.id : null,
//     reportbackUser: props.reportback ? props.reportback.user : null,
//   };
// }

const ReportbackItem = (props) => {
  const { id, url, quantity, noun, caption, firstName, reaction = null, isFetching = false,
    basicDisplay = false, toggleReactionOn, toggleReactionOff } = props;

  const reactionElement = reaction ? (
    <Reaction
      active={reaction.reacted}
      total={reaction.total}
      onToggleOn={() => toggleReactionOn(id, reaction.termId)}
      onToggleOff={() => toggleReactionOff(id, reaction.id)}
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

  const meta = caption ? (<p className="italic">{caption}</p>) : null;

  return (
    <Figure image={url} alt={`${firstName}'s photo`}>
      <ReportbackFigure media={reactionElement} meta={meta} alignment="right" className="padded">
        {! basicDisplay && firstName ? <h4>{firstName}</h4> : null }
        {! basicDisplay && quantity ? <p className="footnote italic">{quantity} {pluralize(quantity, noun.singular, noun.plural)}</p> : null }
      </ReportbackFigure>
    </Figure>
  );
};

ReportbackItem.propTypes = {
  id: PropTypes.string,
  basicDisplay: PropTypes.bool,
  caption: PropTypes.string,
  firstName: PropTypes.string,
  isFetching: PropTypes.bool,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
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

// @TODO: The following props needed to be defined as undefined likely due to how we are
// implementing this component as a lazy loaded item. The props could not be set as required which
// thus meant we needed default props. However, setting the default props as null would cause the
// app to crash. Something to look into...
ReportbackItem.defaultProps = {
  id: undefined,
  basicDisplay: false,
  caption: undefined,
  firstName: 'A Doer',
  isFetching: false,
  noun: {
    singular: 'item',
    plural: 'items',
  },
  quantity: undefined,
  reaction: null,
  url: undefined,
  toggleReactionOff: () => {},
  toggleReactionOn: () => {},
};

export default ReportbackItem;
