import { connect } from 'react-redux';

import AffiliateScholarshipBlock from './AffiliateScholarshipBlock';

/**
 * Provide state from the Redux store as props for this component. (In
 * this case, pulling a few scholarship related fields from the campaign!)
 */
const mapStateToProps = state => ({
  scholarshipAmount: state.campaign.scholarshipAmount,
  scholarshipDeadline: state.campaign.scholarshipDeadline,
});

// Export the Redux container component.
export default connect(mapStateToProps)(AffiliateScholarshipBlock);
