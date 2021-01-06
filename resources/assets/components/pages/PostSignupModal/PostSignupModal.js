import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import SlideshowContainer from '../../Slideshow';
import Affirmation from '../../Affirmation/Affirmation';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const PostSignupModal = ({ affirmation, onClose }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      {affirmation.type === 'affirmation' ? (
        <Affirmation
          {...withoutNulls(affirmation.fields)}
          author={get(affirmation, 'fields.author.fields')}
          onClose={onClose}
        />
      ) : (
        <ContentfulEntryLoader id={affirmation.id} />
      )}
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
