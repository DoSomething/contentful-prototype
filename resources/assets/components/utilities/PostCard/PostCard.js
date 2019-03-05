import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import PostBadge from './PostBadge';
import { BaseFigure } from '../../Figure';
import LazyImage from '../../utilities/LazyImage';
import ReactionButton from '../ReactionButton/ReactionButton';
import { isAuthenticated } from '../../../helpers';

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
    signupId

    actionDetails {
      anonymous
      noun
    }

    user {
      firstName
    }
  }
`;

const PostCard = ({ post }) => {
  // If this post is for an anonymous action, label it with the state (if available).
  // For non-anonymous posts (default), label with the user's first name.
  const authorLabel = post.actionDetails.anonymous
    ? post.location || 'Anonymous'
    : get(post, 'user.firstName', 'A Doer');

  const reactionElement = isAuthenticated() ? (
    <ReactionButton post={post} />
  ) : null;

  // Render the appropriate media for this post:
  let media = null;
  switch (post.type) {
    case 'text':
      media = (
        <div className="chat-bubble -post-bubble margin-bottom-none rounded-top">
          <p className="font-italic word-break">{post.text}</p>
        </div>
      );
      break;
    case 'photo':
      media = <LazyImage alt={`${authorLabel}'s photo`} src={post.url} />;
      break;

    default:
      media = null;
  }

  return (
    <div className={`post post-${post.type}`}>
      <div className="flex-grow">{media}</div>
      <BaseFigure
        media={reactionElement}
        alignment="right"
        className="padded margin-bottom-none"
      >
        <h4>
          {authorLabel}
          <PostBadge status={post.status} tags={post.tags} />
        </h4>
        {post.quantity ? (
          <p className="footnote">
            {post.quantity} {post.actionDetails.noun}
          </p>
        ) : null}
        {post.type !== 'text' && post.text ? <p>{post.text}</p> : null}
      </BaseFigure>
    </div>
  );
};

PostCard.propTypes = {
  post: propType(postCardFragment).isRequired,
};

export default PostCard;
