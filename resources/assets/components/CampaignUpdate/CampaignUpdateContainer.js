/* global window */

import { connect } from 'react-redux';
import { find } from 'lodash';
import CampaignUpdate from './CampaignUpdate';
import { makeShareLink } from '../../helpers';

const mapStateToProps = (state, props) => {
  const campaignUpdate = find(state.campaign.activityFeed, { id: props.id });
  const { author, content, link } = campaignUpdate.fields;

  return {
    author,
    content,
    link,
    shareLink: makeShareLink('campaigns', {
      domain: window.location.origin,
      slug: state.campaign.slug,
      key: props.id,
    }),
  };
};

export default connect(mapStateToProps)(CampaignUpdate);
