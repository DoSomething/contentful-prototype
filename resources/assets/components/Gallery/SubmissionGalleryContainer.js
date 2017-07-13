import { connect } from 'react-redux';
import SubmissionGallery from './SubmissionGallery';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  submissions: state.submissions,
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SubmissionGallery);
