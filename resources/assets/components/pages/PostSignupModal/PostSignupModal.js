import React from 'react';
import PropTypes from 'prop-types';

import SlideshowContainer from '../../Slideshow';
import ContentfulEntry from '../../ContentfulEntry';

const PostSignupModal = ({ affirmation }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      <ContentfulEntry json={affirmation} />
    </SlideshowContainer>
  </div>
);

PostSignupModal.propTypes = {
  affirmation: PropTypes.object, // eslint-disable-line
};

PostSignupModal.defaultProps = {
  affirmation: {
    type: 'affirmation',
  },
};

export default PostSignupModal;
