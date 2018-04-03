import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import classnames from 'classnames';
import gql from 'graphql-tag';

import { BaseFigure } from '../../Figure';

export const reactionButtonFragment = gql`
  fragment ReactionButton on Post {
    reactions
    reacted
  }
`;

const Reaction = ({ post, toggleReaction }) => {
  const reactionButton = <div className={classnames('reaction__button', { '-reacted': post.reacted })} />;

  return (
    <button className="reaction" onClick={toggleReaction}>
      <BaseFigure media={reactionButton} alignment="left" className="margin-bottom-none">
        <span className="reaction__meta">{post.reactions}</span>
      </BaseFigure>
    </button>
  );
};

Reaction.propTypes = {
  post: propType(reactionButtonFragment).isRequired,
  toggleReaction: PropTypes.func.isRequired,
};

export default Reaction;
