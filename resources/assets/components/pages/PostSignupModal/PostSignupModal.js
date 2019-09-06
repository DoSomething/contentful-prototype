import React from 'react';
import PropTypes from 'prop-types';

import SlideshowContainer from '../../Slideshow';
import ContentfulEntry from '../../ContentfulEntry';

const PostSignupModal = ({ affirmation, onClose }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      <ContentfulEntry json={{ ...affirmation, onClose }} />
    </SlideshowContainer>
  </div>
);

PostSignupModal.propTypes = {
  affirmation: PropTypes.object, // eslint-disable-line
  onClose: PropTypes.func.isRequired,
};

PostSignupModal.defaultProps = {
  affirmation: {
    type: 'affirmation',
  },
};

export default PostSignupModal;
