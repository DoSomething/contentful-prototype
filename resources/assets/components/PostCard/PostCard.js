import PropTypes from 'prop-types';
import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import { Figure, BaseFigure } from '../Figure';
import Reaction from '../Reaction';
import { pluralize } from '../../helpers';
import './post.scss';

export const postCardQuery = gql`
  fragment PostCard on Post {
    id
    status
    url
    text
    quantity
    reacted
    reactions
    user {
      firstName
    }
  }
`;

const PostCard = ({ post, noun }) => {
  const reactionElement = (
    <Reaction
      active={post.reacted}
      total={post.reactions}
      onToggleOn={() => console.log('TOGGLE', post.id)}
      onToggleOff={() => console.log('TOGGLE', post.id)}
    />
  );

  return (
    <Figure className="post" image={post.url} alt={`${post.user.firstName}'s photo`}>
      <BaseFigure media={reactionElement} alignment="right" className="padded margin-bottom-none">
        <h4>{post.user.firstName}</h4>
        { post.quantity ? <p className="footnote">{post.quantity} {pluralize(post.quantity, noun.singular, noun.plural)}</p> : null }
        { post.text ? <p>{post.text}</p> : null }
      </BaseFigure>
    </Figure>
  );
};

PostCard.propTypes = {
  post: propType(postCardQuery).isRequired,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

PostCard.defaultProps = {
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

export default PostCard;
