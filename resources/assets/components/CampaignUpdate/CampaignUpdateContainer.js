/* global */

import { connect } from 'react-redux';

import CampaignUpdate from './CampaignUpdate';
import { makeShareLink } from '../../helpers';
import { PHOENIX_URL } from '../../constants';

const mapStateToProps = (state, props) => {
  const linkOptions = {
    domain: PHOENIX_URL,
    slug: state.campaign.slug,
    key: props.id,
  };

  return {
    shareLink: makeShareLink('campaigns', { ...linkOptions, type: 'modal' }),
    titleLink: makeShareLink('campaigns', { ...linkOptions, type: 'blocks' }),
  };
};

export default connect(mapStateToProps)(CampaignUpdate);
