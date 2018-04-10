import { connect } from 'react-redux';
import { get } from 'lodash';
import AffiliateOption from './AffiliateOption';
import { clickedOptOut } from '../../actions/signup';

const mapStateToProps = state => ({
  affiliateMessagingOptOut: state.signups.affiliateMessagingOptOut,
  affiliateOptionLabel: get(
    state.campaign.additionalContent.affiliateOption,
    'label',
    '',
  ),
  moreInformationLabel: get(
    state.campaign.additionalContent.affiliateOption,
    'moreInformationLabel',
    '',
  ),
  moreInformationMessage: get(
    state.campaign.additionalContent.affiliateOption,
    'moreInformationMessage',
    '',
  ),
});

const actionCreators = {
  clickedOptOut,
};

export default connect(mapStateToProps, actionCreators)(AffiliateOption);
