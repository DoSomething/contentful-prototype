import { connect } from 'react-redux';
import { clickedSignUp } from '../../actions';
import SignupButton from './SignupButton';

const actionCreators = {
  clickedSignUp
};

export default Component => connect(actionCreators)(Component);
