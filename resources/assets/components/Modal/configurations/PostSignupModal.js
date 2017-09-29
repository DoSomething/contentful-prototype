import React from 'react';
import PropTypes from 'prop-types';
import { AffirmationContainer } from '../../Affirmation';
import { CompetitionBlockContainer } from '../../CompetitionBlock';

const PostSignupModal = ({ competitionStep }) => (
  <article>
    <div className="modal__slide">
      <AffirmationContainer />
    </div>
    <div className="modal__slide">
      { competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null }
    </div>
  </article>
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
