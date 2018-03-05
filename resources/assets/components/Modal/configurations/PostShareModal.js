import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';

const PostShareModal = (props) => {
  const { content, confirmationAction, confirmationActionLink, closeModal } = props;

  return (
    <Card title="Thanks for sharing!" className="modal__slide bordered rounded" onClose={closeModal}>
      <Markdown className="padded">
        { content || PostShareModal.defaultProps.content }
      </Markdown>
      { confirmationAction && confirmationActionLink ? (
        <ul className="form-actions -padded">
          <a className="button" href={confirmationActionLink}>{confirmationAction}</a>
        </ul>
      ) : null }
    </Card>
  );
};

PostShareModal.propTypes = {
  content: PropTypes.string,
  confirmationAction: PropTypes.string,
  confirmationActionLink: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

PostShareModal.defaultProps = {
  content: 'Thanks for rallying your friends on Facebook!',
  confirmationAction: null,
  confirmationActionLink: null,
};

export default PostShareModal;
