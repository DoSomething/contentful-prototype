import { connect } from 'react-redux';

import Experiment from './Experiment';
import { participateInExperiment } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  experiments: state.experiments,
  app: state,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  participateInExperiment,
};

export default connect(mapStateToProps, actionCreators)(Experiment);
