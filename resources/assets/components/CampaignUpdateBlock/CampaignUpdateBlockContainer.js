/* global location */

import { connect } from 'react-redux';
import CampaignUpdateBlock from './CampaignUpdateBlock';

const mapStateToProps = (state, props) => ({
  updateShareLink: `${location.origin}/us/campaigns/${state.campaign.slug}/blocks/${props.id}`,
});

export default connect(mapStateToProps)(CampaignUpdateBlock);
