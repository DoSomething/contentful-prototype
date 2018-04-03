import React from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { Mutation } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { BaseFigure } from '../../Figure';

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

const ReactionButton = ({ post }) => {
  const button = <div className={classnames('reaction__button', { '-reacted': post.reacted })} />;

  return (
    <Mutation mutation={TOGGLE_REACTION} variables={{ postId: post.id }}>
      {toggleReaction => (
        <button className="reaction" onClick={toggleReaction}>
          <BaseFigure media={button} alignment="left" className="margin-bottom-none">
            <span className="reaction__meta">{post.reactions}</span>
          </BaseFigure>
        </button>
      )}
    </Mutation>
  );
};

ReactionButton.propTypes = {
  post: propType(reactionButtonFragment).isRequired,
};

export default ReactionButton;
