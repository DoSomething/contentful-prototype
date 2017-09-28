import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import Share from './Share';
import {
  facebookShareCancelled,
  facebookShareCompleted,
  requestedFacebookShare,
} from '../../actions/share';

const mapStateToProps = state => ({
  share: state.share,
  user: state.user,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  facebookShareCancelled,
  facebookShareCompleted,
  requestedFacebookShare,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(
  PuckConnector(Share),
);
