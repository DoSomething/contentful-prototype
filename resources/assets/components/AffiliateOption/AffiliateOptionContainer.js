import { connect } from 'react-redux';

import AffiliateOption from './AffiliateOption';
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
)(AffiliateOption);
