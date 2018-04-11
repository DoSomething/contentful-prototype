import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import BlockModal from './BlockModal';
import Card from '../../utilities/Card/Card';

const PostShareModal = props => {
  const { affirmationText, affirmationBlock, closeModal } = props;

  // If we have a block to show, render it as a block modal:
  if (affirmationBlock) {
    return <BlockModal closeModal={closeModal} json={affirmationBlock} />;
  }

  // Otherwise, return a simple modal with the given Markdown:
  return (
    <Card
      title="Thanks for sharing!"
      className="modal__slide bordered rounded"
      onClose={closeModal}
    >
      <Markdown className="padded">{affirmationText}</Markdown>
    </Card>
  );
};

PostShareModal.propTypes = {
  affirmationText: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
  closeModal: PropTypes.func.isRequired,
};

PostShareModal.defaultProps = {
  affirmationText: 'Thanks for rallying your friends on Facebook!',
};

export default PostShareModal;
