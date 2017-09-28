import { connect } from 'react-redux';
import { clickedSignUp } from '../../actions/signup';

const actionCreators = {
  clickedSignUp,
};

export default Component => connect(null, actionCreators)(Component);
