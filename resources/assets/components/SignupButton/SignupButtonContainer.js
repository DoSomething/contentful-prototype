import { connect } from 'react-redux';
import { clickedSignUp } from '../../actions/signup';

const mapStateToProps = state => ({
  template: state.campaign.template,
});

const actionCreators = {
  clickedSignUp,
};

export default Component => connect(mapStateToProps, actionCreators)(Component);
