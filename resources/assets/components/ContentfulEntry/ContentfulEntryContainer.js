import { connect } from 'react-redux';

import ContentfulEntry from './ContentfulEntry';
import { findContentfulEntryInCampaign } from '../../helpers/campaign';

/**
 * Provide state from the Redux store as props for this component.
 *
 * @return {Object}
 */
const mapStateToProps = (state, { id }) => ({
  json: findContentfulEntryInCampaign(state, id),
});

export default connect(mapStateToProps)(ContentfulEntry);
