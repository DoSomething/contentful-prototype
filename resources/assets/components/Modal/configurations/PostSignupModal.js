import React from 'react';
import PropTypes from 'prop-types';
import Block from '../../Block';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import { ModalControls } from '../../Modal';
import SlideshowContainer from '../../Slideshow';

const PostSignupModal = ({ competitionStep, affirmation, closeModal }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      { competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null }
      <ModalControls onClose={closeModal}>
        <Block json={affirmation} />
      </ModalControls>
    </SlideshowContainer>
  </div>
);


PostSignupModal.propTypes = {
  affirmation: PropTypes.object.isRequired, // eslint-disable-line
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
