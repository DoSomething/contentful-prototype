import { connect } from 'react-redux';
import { clickedSignUp } from '../../actions';

const actionCreators = {
  clickedSignUp,
};

export default Component => connect(null, actionCreators)(Component);
