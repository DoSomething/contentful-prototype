import { connect } from 'react-redux';
import BlockPage from './BlockPage';
import { findContentfulEntry } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  const json = findContentfulEntry(state, id);

  return { json };
};

// Export the container component.
export default connect(mapStateToProps)(BlockPage);
