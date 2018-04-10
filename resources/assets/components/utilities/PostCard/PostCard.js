import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import LazyImage from '../../LazyImage';
import { BaseFigure } from '../../Figure';
import { pluralize } from '../../../helpers';
import ReactionButton from '../ReactionButton/ReactionButton';

import './post.scss';

export const postCardFragment = gql`
  fragment PostCard on Post {
    id
    type
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
  const firstName = post.user ? post.user.firstName : 'A Doer';
  const reactionElement = <ReactionButton post={post} />;
  let media = null;

  // Render the appropriate media for this post:
  switch (post.type) {
    case 'text':
      media = (
        <div className="chat-bubble -post-bubble flex-center-y margin-bottom-none rounded-top">
          <h4 className="color-yellow caps-lock">I beat bullying by...</h4>
          <p className="color-white caps-lock">{post.text}</p>
        </div>
      );
      break;
    case 'photo':
      media = <LazyImage alt={`${firstName}'s photo`} src={post.url} />;
      break;

    default:
      media = null;
  }

  return (
    <BaseFigure className="post" media={media}>
      <BaseFigure
        media={reactionElement}
        alignment="right"
        className="padded margin-bottom-none"
      >
        <h4>{firstName}</h4>
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
