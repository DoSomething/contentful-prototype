import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';

const PostShareModal = (props) => {
  const { content, closeModal } = props;

  return (
    <Card title="Thanks for sharing!" className="modal__slide bordered rounded" onClose={closeModal}>
      <Markdown className="padded">
        { content || PostShareModal.defaultProps.content }
      </Markdown>
    </Card>
  );
};

PostShareModal.propTypes = {
  content: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

PostShareModal.defaultProps = {
  content: 'Thanks for rallying your friends on Facebook!',
};

export default PostShareModal;
