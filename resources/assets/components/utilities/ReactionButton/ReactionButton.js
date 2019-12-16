import React from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { Mutation } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { BaseFigure } from '../Figure/Figure';
import Spinner from '../../artifacts/Spinner/Spinner';

import './reaction.scss';

export const reactionButtonFragment = gql`
  fragment ReactionButton on Post {
    reactions
    reacted
  }
`;

const TOGGLE_REACTION = gql`
  mutation ToggleReaction($postId: Int!) {
    toggleReaction(postId: $postId) {
      id
      reactions
      reacted
    }
  }
`;

const ReactionButton = ({ className, post }) => (
  <Mutation mutation={TOGGLE_REACTION} variables={{ postId: post.id }}>
    {(toggleReaction, { loading }) => {
      const button = loading ? (
        <Spinner size="20px" />
      ) : (
        <div
          className={classnames('reaction__button', {
            '-reacted': post.reacted,
          })}
        />
      );

      return (
        <button
          type="button"
          className={classnames('reaction flex items-center', className)}
          onClick={toggleReaction}
        >
          {button}

          {post.reactions ? (
            <span className="ml-2 text-gray-600">{post.reactions}</span>
          ) : null}
        </button>
      );
    }}
  </Mutation>
);

ReactionButton.propTypes = {
  post: propType(reactionButtonFragment).isRequired,
};

export default ReactionButton;

{
  /* <BaseFigure
  media={button}
  alignment={post.reactions ? 'left' : null}
  className="mb-0"
>
  {post.reactions ? (
    <span className="reaction__meta">{post.reactions}</span>
  ) : null}
</BaseFigure> */
}
