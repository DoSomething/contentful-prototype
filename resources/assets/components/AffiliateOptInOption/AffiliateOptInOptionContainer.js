import { connect } from 'react-redux';

import AffiliateOptInOption from './AffiliateOptInOption';
import { clickedOptIn } from '../../actions/signup';

const mapStateToProps = state => ({
  affiliateMessagingOptIn: state.signups.affiliateMessagingOptIn,
});

const actionCreators = {
  clickedOptIn,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(AffiliateOptInOption);
