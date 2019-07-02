import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propType } from 'graphql-anywhere';

import Card from '../Card/Card';
import PostBadge from './PostBadge';
import ReviewLink from './ReviewLink';
import { BaseFigure } from '../../Figure';
import LazyImage from '../LazyImage';
import ReactionButton from '../ReactionButton/ReactionButton';
import { isAuthenticated, isStaff } from '../../../helpers';

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
    permalink

    actionDetails {
      anonymous
      noun
    }

    user {
      firstName
    }
  }
`;

const PostCard = ({ post, hideReactions }) => {
  const isAnonymous = post.actionDetails.anonymous;

  // If this post is for an anonymous action, label it with the state (if available).
  // For non-anonymous posts (default), label with the user's first name.
  const authorLabel = isAnonymous
    ? post.location || 'Anonymous'
    : get(post, 'user.firstName', 'A Doer');

  const reactionElement =
    !hideReactions && isAuthenticated() ? <ReactionButton post={post} /> : null;

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
        <div className={classnames({ 'flex-grow': post.type === 'text' })}>
          {media}
        </div>
        <BaseFigure
          media={reactionElement}
          alignment="right"
          className="padded margin-bottom-none"
        >
          <h4>
            {authorLabel}
            {isStaff() ? <ReviewLink url={post.permalink} /> : null}
            <PostBadge status={post.status} tags={post.tags} />
          </h4>
          {post.quantity ? (
            <p className="footnote">
              {post.quantity} {post.actionDetails.noun}
            </p>
          ) : null}
          {post.type !== 'text' && post.text ? <p>{post.text}</p> : null}
          <p className="footnote">{format(post.createdAt, 'PPP')}</p>
        </BaseFigure>
      </div>
    </Card>
  );
};

PostCard.propTypes = {
  hideReactions: PropTypes.bool,
  post: propType(postCardFragment).isRequired,
};

PostCard.defaultProps = {
  hideReactions: false,
};

export default PostCard;
