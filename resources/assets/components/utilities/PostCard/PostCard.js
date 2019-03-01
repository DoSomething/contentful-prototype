import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import PostBadge from './PostBadge';
import { BaseFigure } from '../../Figure';
import LazyImage from '../../utilities/LazyImage';
import ReactionButton from '../ReactionButton/ReactionButton';
import { isAuthenticated, pluralize } from '../../../helpers';

import './post.scss';

export const postCardFragment = gql`
  fragment PostCard on Post {
    id
    type
    status
    url
    text
    tags
    quantity
    location(format: HUMAN_FORMAT)

    user {
      firstName
    }
  }
`;

const PostCard = ({ post, noun }) => {
  // If this post isn't anonymous, show first name. Otherwise, state or fallback to "A Doer".
  const displayName = post.user
    ? post.user.firstName
    : post.location || 'A Doer';

  const reactionElement = isAuthenticated() ? (
    <ReactionButton post={post} />
  ) : null;
  let media = null;

  // Render the appropriate media for this post:
  switch (post.type) {
    case 'text':
      media = (
        <div className="chat-bubble -post-bubble margin-bottom-none rounded-top">
          <p className="font-italic">{post.text}</p>
        </div>
      );
      break;
    case 'photo':
      media = <LazyImage alt={`${displayName}'s photo`} src={post.url} />;
      break;

    default:
      media = null;
  }

  return (
    <BaseFigure className={`post post-${post.type}`} media={media}>
      <BaseFigure
        media={reactionElement}
        alignment="right"
        className="padded margin-bottom-none"
      >
        <h4>
          {displayName}
          <PostBadge status={post.status} tags={post.tags} />
        </h4>
        {post.quantity ? (
          <p className="footnote">
            {post.quantity}{' '}
            {pluralize(post.quantity, noun.singular, noun.plural)}
          </p>
        ) : null}
        {post.type !== 'text' && post.text ? <p>{post.text}</p> : null}
      </BaseFigure>
    </BaseFigure>
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
  noun: {
    singular: 'item',
    plural: 'items',
  },
};

export default PostCard;
