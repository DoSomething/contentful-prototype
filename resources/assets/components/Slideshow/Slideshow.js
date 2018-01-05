import React from 'react';
import PropTypes from 'prop-types';
import './slideshow.scss';

const Slideshow = (props) => {
  const {
    hideCloseButton, isFinalSlide, nextSlide,
    onComplete, slide, slideshowId,
  } = props;

  const nextFunc = isFinalSlide ? onComplete : () => nextSlide(slideshowId);

  const SlideButton = () => (isFinalSlide && hideCloseButton ? null : (
    <button
      className="button slideshow__button margin-top-lg"
      onClick={() => nextFunc()}
    >{ isFinalSlide ? 'Close' : 'Next' }</button>
  ));

  return (
    <div className="slideshow">
      <div className="slideshow__slide">
        { slide }
      </div>
      <SlideButton />
    </div>
  );
};

Slideshow.propTypes = {
  hideCloseButton: PropTypes.bool,
  isFinalSlide: PropTypes.bool.isRequired,
  nextSlide: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
  slide: PropTypes.node.isRequired,
  slideshowId: PropTypes.string.isRequired,
};

Slideshow.defaultProps = {
  hideCloseButton: false,
  onComplete: null,
};

export default Slideshow;
