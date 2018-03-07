/* global window */

import { connect } from 'react-redux';
import CampaignUpdate from './CampaignUpdate';
import { makeShareLink } from '../../helpers';

const mapStateToProps = (state, props) => {
  const linkOptions = {
    domain: window.location.origin,
    slug: state.campaign.slug,
    key: props.id,
  };

  return {
    shareLink: makeShareLink('campaigns', { ...linkOptions, type: 'modal' }),
    titleLink: makeShareLink('campaigns', { ...linkOptions, type: 'blocks' }),
  };
};

export default connect(mapStateToProps)(CampaignUpdate);
