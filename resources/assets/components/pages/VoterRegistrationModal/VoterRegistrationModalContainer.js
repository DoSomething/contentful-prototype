import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import VoterRegistrationModal from './VoterRegistrationModal';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(VoterRegistrationModal);
