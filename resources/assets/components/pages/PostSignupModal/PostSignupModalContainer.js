import { connect } from 'react-redux';
import PostSignupModal from './PostSignupModal';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affirmation: state.campaign.affirmation,
});

export default connect(mapStateToProps)(PostSignupModal);
