import React from 'react';
import PropTypes from 'prop-types';
import { AffirmationContainer } from '../../Affirmation';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import SlideshowContainer from '../../Slideshow';

const PostSignupModal = ({ competitionStep, closeModal }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      { competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null }
      <AffirmationContainer />
    </SlideshowContainer>
  </div>
);

PostSignupModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  competitionStep: PropTypes.shape({
    content: PropTypes.string.isRequired,
    photo: PropTypes.string,
    additionalContent: PropTypes.shape({
      author: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

PostSignupModal.defaultProps = {
  competitionStep: null,
};

export default PostSignupModal;
