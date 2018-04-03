import PropTypes from 'prop-types';
import React from 'react';

import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import { pluralize } from '../../helpers';
import './post.scss';

const Post = (props) => {
  const { id, firstName, url, text, quantity, reacted, reactions, noun } = props;

  const reactionElement = (
    <Reaction
      active={reacted}
      total={reactions}
      onToggleOn={() => console.log(id)}
      onToggleOff={() => console.log(id)}
    />
  );

  return (
    <Figure className="post" image={url} alt={`${firstName}'s photo`}>
      <BaseFigure media={reactionElement} alignment="right" className="padded margin-bottom-none">
        <h4>{firstName}</h4>
        { quantity ? <p className="footnote">{quantity} {pluralize(quantity, noun.singular, noun.plural)}</p> : null }
        { text ? <p>{text}</p> : null }
      </BaseFigure>
    </Figure>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  url: PropTypes.string,
  text: PropTypes.string,
  quantity: PropTypes.number,
  reacted: PropTypes.bool,
  reactions: PropTypes.number,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

Post.defaultProps = {
  firstName: 'A Doer',
  url: undefined,
  text: null,
  quantity: undefined,
  reacted: false,
  reactions: 0,
  noun: {
    singular: 'item',
    plural: 'items',
  },
};

export default Post;
