import React from 'react';
import PropTypes from 'prop-types';

const Slideshow = ({ closeModal, isFinalSlide, nextSlide, slide, slideshowId }) => ({
  <div className="slideshow">
    <div className="slideshow__slide">
      { slide }
    </div>
    <button
      className="button slideshow__button"
      onClick={() => isFinalSlide ? closeModal() : nextSlide(slideshowId)}
    >{ isFinalSlide ? 'Close' : 'Next' }</button>
  </div>
});

Slideshow.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isFinalSlide: PropTypes.bool.isRequired,
  nextSlide: PropTypes.func.isRequired,
  slide: PropTypes.node.isRequired,
  slideshowId: PropTypes.string.isRequired,
};

export default Slideshow;
