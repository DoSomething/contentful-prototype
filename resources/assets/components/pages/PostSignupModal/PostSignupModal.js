import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import SlideshowContainer from '../../Slideshow';
import AffirmationContainer from '../../Affirmation/AffirmationContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const PostSignupModal = ({ affirmation, onClose }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      {affirmation.type === 'affirmation' ? (
        <AffirmationContainer
          {...withoutNulls(affirmation.fields)}
          author={get(affirmation, 'fields.author.fields')}
          onClose={onClose}
        />
      ) : (
        <ContentfulEntryLoader json={affirmation.id} />
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
