/* global window */

import { connect } from 'react-redux';
import CampaignUpdateBlock from './CampaignUpdateBlock';
import { makeShareLink } from '../../helpers';

const mapStateToProps = (state, props) => ({
  shareLink: makeShareLink('campaigns', {
    domain: window.location.origin,
    slug: state.campaign.slug,
    key: props.id,
  }),
});

export default connect(mapStateToProps)(CampaignUpdateBlock);
