import { connect } from 'react-redux';
import { clickedSignUp } from '../../actions/signup';
import { convertExperiment } from '../../actions';

const mapStateToProps = state => ({
  template: state.campaign.template,
  experiments: state.experiments,
});

const actionCreators = {
  clickedSignUp,
  convertExperiment,
};

export default Component => connect(mapStateToProps, actionCreators)(Component);
