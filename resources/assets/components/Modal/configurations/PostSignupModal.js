import React from 'react';
import PropTypes from 'prop-types';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import SlideshowContainer from '../../Slideshow';
import BlockModal from './BlockModal';

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
      <BlockModal closeModal={closeModal} json={affirmation} />
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
