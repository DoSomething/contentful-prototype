import { connect } from 'react-redux';

import ContentfulEntry from './ContentfulEntry';
import { findContentfulEntry } from '../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 *
 * @return {Object}
 */
const mapStateToProps = (state, { id }) => ({
  json: findContentfulEntry(state, id),
});

export default connect(mapStateToProps)(ContentfulEntry);
