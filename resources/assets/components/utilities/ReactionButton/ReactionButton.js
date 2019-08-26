import React from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { Mutation } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { BaseFigure } from '../Figure';
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

const ReactionButton = ({ post }) => (
  <Mutation mutation={TOGGLE_REACTION} variables={{ postId: post.id }}>
    {(toggleReaction, { loading }) => {
      const button = loading ? (
        <div className="spinner" />
      ) : (
        <div
          className={classnames('reaction__button', {
            '-reacted': post.reacted,
          })}
        />
      );

      return (
        <button type="button" className="reaction" onClick={toggleReaction}>
          <BaseFigure
            media={button}
            alignment={post.reactions ? 'left' : null}
            className="margin-bottom-none"
          >
            {post.reactions ? (
              <span className="reaction__meta">{post.reactions}</span>
            ) : null}
          </BaseFigure>
        </button>
      );
    }}
  </Mutation>
);

ReactionButton.propTypes = {
  post: propType(reactionButtonFragment).isRequired,
};

export default ReactionButton;
