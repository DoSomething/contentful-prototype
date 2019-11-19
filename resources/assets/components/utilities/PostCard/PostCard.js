import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { propType } from 'graphql-anywhere';

import Card from '../Card/Card';
import PostBadge from './PostBadge';
import LazyImage from '../LazyImage';
import ReviewLink from './ReviewLink';
import { BaseFigure } from '../Figure/Figure';
import { isAuthenticated, isStaff } from '../../../helpers';
import ReactionButton from '../ReactionButton/ReactionButton';

import './post.scss';

export const postCardFragment = gql`
  fragment PostCard on Post {
    id
    type
    status
    url
    text
    tags
    impact
    location(format: HUMAN_FORMAT)
    signupId
    createdAt
    permalink

    actionDetails {
      anonymous
    }

    user {
      firstName
    }
  }
`;

const PostCard = ({ post, hideCaption, hideQuantity, hideReactions }) => {
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
        <div className="px-3 py-6">
          <p className="italic text-black text-lg word-break">{post.text}</p>
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
          className="p-3 mb-0"
        >
          <h4>
            {authorLabel}
            {isStaff() ? <ReviewLink url={post.permalink} /> : null}
            <PostBadge status={post.status} tags={post.tags} />
          </h4>

          {post.impact && !hideQuantity ? (
            <p className="footnote">{post.impact}</p>
          ) : null}

          {isAnonymous ? (
            <p className="footnote">{format(post.createdAt, 'PPP')}</p>
          ) : null}

          {post.type !== 'text' && post.text && !hideCaption ? (
            <p className="text-gray-600">{post.text}</p>
          ) : null}
        </BaseFigure>
      </div>
    </Card>
  );
};

PostCard.propTypes = {
  hideCaption: PropTypes.bool,
  hideQuantity: PropTypes.bool,
  hideReactions: PropTypes.bool,
  post: propType(postCardFragment).isRequired,
};

PostCard.defaultProps = {
  hideCaption: false,
  hideQuantity: false,
  hideReactions: false,
};

export default PostCard;
