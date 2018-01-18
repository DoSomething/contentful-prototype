import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';

const PostShareModal = (props) => {
  const { content, closeModal } = props;

  return (
    <Card title="Thanks for sharing!" className="modal__slide bordered rounded" onClose={closeModal}>
      {
        content ?
          <Markdown className="padded">{ content }</Markdown>
          :
          null
      }
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
