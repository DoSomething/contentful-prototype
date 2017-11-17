/* global window */

import { connect } from 'react-redux';
import { find } from 'lodash';
import CampaignUpdate from './CampaignUpdate';
import { makeShareLink } from '../../helpers';

const mapStateToProps = (state, props) => {
  const campaignUpdate = find(state.campaign.activityFeed, { id: props.id });
  const { author, content, link } = campaignUpdate.fields;
  const linkOptions = {
    domain: window.location.origin,
    slug: state.campaign.slug,
    key: props.id,
  };

  return {
    author,
    content,
    link,
    shareLink: makeShareLink('campaigns', { ...linkOptions, type: 'modal' }),
    titleLink: makeShareLink('campaigns', { ...linkOptions, type: 'blocks' }),
  };
};

export default connect(mapStateToProps)(CampaignUpdate);
