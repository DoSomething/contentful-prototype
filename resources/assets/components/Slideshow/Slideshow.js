import React from 'react';
import PropTypes from 'prop-types';

// TODO: Investigate why the `no-confusing-arrow` rule isn't working in this file.
/* eslint-disable no-confusing-arrow */
const Slideshow = ({ isFinalSlide, nextSlide, onComplete, slide, slideshowId }) => (
  <div className="slideshow">
    <div className="slideshow__slide">
      { slide }
    </div>
    <button
      className="button slideshow__button"
      onClick={() => isFinalSlide ? onComplete() : nextSlide(slideshowId)}
    >{ isFinalSlide ? 'Close' : 'Next' }</button>
  </div>
);

Slideshow.propTypes = {
  isFinalSlide: PropTypes.bool.isRequired,
  nextSlide: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  slide: PropTypes.node.isRequired,
  slideshowId: PropTypes.string.isRequired,
};

export default Slideshow;
