import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';
import ModalControls from '../ModalControls';
import ContentfulEntry from '../../ContentfulEntry';

const PostShareModal = (props) => {
  const { affirmationText, affirmationBlock, closeModal } = props;

  // If we have a block to show, render it as a modal:
  if (affirmationBlock) {
    return (
      <ModalControls onClose={closeModal}>
        <ContentfulEntry json={affirmationBlock} />
      </ModalControls>
    );
  }

  // Otherwise, return a simple modal with the given Markdown:
  return (
    <Card title="Thanks for sharing!" className="modal__slide bordered rounded" onClose={closeModal}>
      <Markdown className="padded">
        { affirmationText }
      </Markdown>
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
