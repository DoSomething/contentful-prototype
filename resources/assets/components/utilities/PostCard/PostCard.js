import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import { propType } from 'graphql-anywhere';

import Card from '../Card/Card';
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
    createdAt

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
  const isAnonymous = post.actionDetails.anonymous;

  // If this post is for an anonymous action, label it with the state (if available).
  // For non-anonymous posts (default), label with the user's first name.
  const authorLabel = isAnonymous
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
      media = (
        <LazyImage
          className="post-photo"
          alt={`${authorLabel}'s photo`}
          src={post.url}
        />
      );
      break;

    default:
      media = null;
  }

  return (
    <Card className={`rounded h-full post-ornament-${post.type}`} key={post.id}>
      <div className="post">
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
          {isAnonymous ? (
            <p className="footnote">{format(post.createdAt, 'PPP')}</p>
          ) : null}
          {post.type !== 'text' && post.text ? <p>{post.text}</p> : null}
        </BaseFigure>
      </div>
    </Card>
  );
};

PostCard.propTypes = {
  post: propType(postCardFragment).isRequired,
};

export default PostCard;
