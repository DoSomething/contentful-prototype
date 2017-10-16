import React from 'react';
import { connect } from 'react-redux';
import { nextSlide } from '../../actions/slideshow';
import Slideshow from './Slideshow';

const mapStateToOwnProps = (state, ownProps) => {
  const slideIndex = state.slideshow[ownProps.slideshowId] || 0;
  const children = React.Children.toArray(ownProps.children);
  const slide = children[slideIndex] || null;

  return {
    isFinalSlide: slideIndex >= children.length - 1,
    slide,
  };
};

const actionCreators = {
  nextSlide,
};

export default connect(mapStateToOwnProps, actionCreators)(Slideshow);
