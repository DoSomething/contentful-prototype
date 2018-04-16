import React from 'react';
import PropTypes from 'prop-types';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import SlideshowContainer from '../../Slideshow';
import ContentfulEntry from '../../ContentfulEntry';

const PostSignupModal = ({ competitionStep, affirmation }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post-signup-modal" hideCloseButton>
      {competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null}
      <ContentfulEntry json={affirmation} />
    </SlideshowContainer>
  </div>
);

PostSignupModal.propTypes = {
  affirmation: PropTypes.object.isRequired, // eslint-disable-line
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
