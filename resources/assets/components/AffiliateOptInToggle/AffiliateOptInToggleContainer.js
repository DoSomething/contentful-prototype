import { connect } from 'react-redux';

import AffiliateOptInToggle from './AffiliateOptInToggle';
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
)(AffiliateOptInToggle);
