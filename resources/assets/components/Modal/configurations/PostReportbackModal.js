import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Markdown from '../../Markdown';

const PostReportbackModal = (props) => {
  const { content, closeModal } = props;

  return (
    <Card title="We Got Your Submission" className="modal__slide bordered rounded" onClose={closeModal}>
      <Markdown className="padding-md">
        {content || PostReportbackModal.defaultProps.content }
      </Markdown>
    </Card>
  );
};

PostReportbackModal.propTypes = {
  content: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

PostReportbackModal.defaultProps = {
  content: 'Thanks! We got your submission and you\'re entered to win the scholarship!',
};

export default PostReportbackModal;
