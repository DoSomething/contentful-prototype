import React from 'react';
import PropTypes from 'prop-types';
import { AffirmationContainer } from '../../Affirmation';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import Slideshow from '../../Slideshow';

const PostSignupModal = ({ competitionStep }) => (
  <div className="modal__slide">
    <Slideshow slideshowId="post signup modal">
      { competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null }
      <AffirmationContainer />
    </Slideshow>
  </div>
);

PostSignupModal.propTypes = {
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
