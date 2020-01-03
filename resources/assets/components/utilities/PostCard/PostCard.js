import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Card from '../Card/Card';
import PostBadge from './PostBadge';
import LazyImage from '../LazyImage';
import ReviewLink from './ReviewLink';
import { isAuthenticated, isStaff } from '../../../helpers';
import ReactionButton from '../ReactionButton/ReactionButton';

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

  // Render the appropriate media for this post:
  let media = null;
  switch (post.type) {
    case 'text':
      media = (
        <div className="flex-grow px-3 py-6">
          <p className="italic text-black text-lg word-break">{post.text}</p>
        </div>
      );
      break;
    case 'photo':
      media = (
        <LazyImage
          className="post-photo w-full"
          alt={`${authorLabel}'s photo`}
          src={post.url}
        />
      );
      break;

    default:
      media = null;
  }

  return (
    <Card className="rounded h-full overflow-hidden" data-id={post.id}>
      <div className="post bg-white flex flex-col h-full relative">
        {media}

        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h4 className="font-bold m-0 text-base">{authorLabel}</h4>

              {isStaff() ? (
                <ReviewLink className="ml-2" url={post.permalink} />
              ) : null}

              <PostBadge
                className="ml-2"
                status={post.status}
                tags={post.tags}
              />
            </div>

            {!hideReactions && isAuthenticated() ? (
              <ReactionButton post={post} />
            ) : null}
          </div>

          {isAnonymous ? (
            <p className="mt-1 text-gray-600 text-sm">
              {format(post.createdAt, 'PPP')}
            </p>
          ) : null}

          {post.impact && !hideQuantity ? (
            <p className="mt-1 text-gray-600 text-sm">{post.impact}</p>
          ) : null}

          {post.type !== 'text' && post.text && !hideCaption ? (
            <p className="text-gray-600 mt-3">{post.text}</p>
          ) : null}
        </div>
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
