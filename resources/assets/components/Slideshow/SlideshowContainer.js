import { connect } from 'react-redux';
import { closeModal, nextSlide } from '../../actions';
import Slideshow from './Slideshow';

const mapStateToOwnProps = (state, ownProps) => {
  // TODO;
  return {};
};

const actionCreators = {
  closeModal, nextSlide,
};

export default connect(mapStateToOwnProps, actionCreators)(Slideshow);
