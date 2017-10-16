import React from 'react';
import PropTypes from 'prop-types';
import { AffirmationContainer } from '../../Affirmation';
import { CompetitionBlockContainer } from '../../CompetitionBlock';
import SlideshowContainer from '../../Slideshow';

import Card from '../../Card';

const PostSignupModal = ({ competitionStep, closeModal }) => (
  <div className="modal__slide">
    <SlideshowContainer slideshowId="post signup modal" onComplete={closeModal}>
      { competitionStep ? (
        <CompetitionBlockContainer
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />
      ) : null }
      <Card className="bordered padded">
        <h1>Why hello there,</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et libero blandit, fermentum ante vitae, consequat velit. Proin ac sem hendrerit, volutpat elit eget, tincidunt ex. Sed sed lectus tellus. Morbi eleifend mauris nec sem egestas tincidunt. Praesent sollicitudin turpis ac sem dictum tincidunt. Aliquam ut est in enim ullamcorper ullamcorper. In egestas quam quis elit molestie, sed volutpat arcu tincidunt. Quisque eu ultrices magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet mi dignissim, vulputate augue ut, fermentum metus. Nunc a elit in sapien efficitur imperdiet. Maecenas eget posuere dolor. Nulla hendrerit, mauris eget cursus semper, erat nibh scelerisque lectus, sed scelerisque dui ex et lorem. Maecenas nibh nulla, sodales ut ullamcorper ullamcorper, ullamcorper non nisl.</p>
      </Card>
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
