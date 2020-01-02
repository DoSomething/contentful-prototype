import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Mutation } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import heartEmptyIcon from './heart_empty_icon.svg';
import heartFilledIcon from './heart_filled_icon.svg';
import Spinner from '../../artifacts/Spinner/Spinner';

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

// @TODO:accessibilty We should establish a "focus" style for when the reaction
// button is focused by a keyboard only user.
const ReactionButton = ({ className, post }) => (
  <Mutation mutation={TOGGLE_REACTION} variables={{ postId: post.id }}>
    {(toggleReaction, { loading }) => {
      const heartIcon = post.reacted ? heartFilledIcon : heartEmptyIcon;

      return loading ? (
        <Spinner size="20px" />
      ) : (
        <button
          type="button"
          className={classnames(
            'reaction flex items-center focus:outline-none',
            className,
          )}
          onClick={toggleReaction}
        >
          <img
            alt="reaction heart icon"
            className={classnames('reaction__icon', {
              'is-reacted': post.reacted,
            })}
            src={heartIcon}
            style={{ height: 18, width: 24, pointerEvents: 'none' }}
          />

          {post.reactions ? (
            <span className="reaction__count leading-none ml-2 text-gray-600">
              {post.reactions}
            </span>
          ) : null}
        </button>
      );
    }}
  </Mutation>
);

ReactionButton.propTypes = {
  className: PropTypes.string,
  post: propType(reactionButtonFragment).isRequired,
};

ReactionButton.defaultProps = {
  className: null,
};

export default ReactionButton;
