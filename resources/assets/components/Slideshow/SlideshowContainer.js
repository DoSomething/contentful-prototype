import React from 'react';
import { connect } from 'react-redux';
import { closeModal, nextSlide } from '../../actions';
import Slideshow from './Slideshow';

const mapStateToOwnProps = (state, ownProps) => {
  const slideIndex = state.slideshow[ownProps.slideshowId] || 0;
  const children = React.Children.toArray(ownProps.children);
  console.log(children);

  return {
    slideIndex,
    isFinalSlide: false,
    slide: null,
  };
};

const actionCreators = {
  closeModal, nextSlide,
};

export default connect(mapStateToOwnProps, actionCreators)(Slideshow);
