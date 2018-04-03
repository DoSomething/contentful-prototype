import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import { pluralize } from '../../../helpers';
import { Figure, BaseFigure } from '../../Figure';
import ReactionButton from '../ReactionButton/ReactionButton';

import './post.scss';

export const postCardFragment = gql`
  fragment PostCard on Post {
    id
    status
    url
    text
    quantity
    user {
      firstName
    }
  }
`;

const PostCard = ({ post, noun }) => {
  const reactionElement = (
    <ReactionButton
      post={post}
      toggleReaction={() => console.log('this gonna toggle that')}
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
  post: propType(postCardFragment).isRequired,
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
