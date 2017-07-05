/* @flow */

import React from 'react';
import CampaignUpdateBlock from '../CampaignUpdateBlock';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from '../ReportbackBlock';
import StaticBlock from '../StaticBlock';
import CallToActionBlockContainer from '../../containers/CallToActionBlockContainer';
import { BlockJson } from '../../types';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: BlockJson = { fields: { type: null } };

const Block = ({ json = DEFAULT_BLOCK }: { json: BlockJson }) => {
  switch (json.fields.type) {
    case 'campaign_update':
      return <CampaignUpdateBlock id={json.id} fields={json.fields} />;

    case 'join_cta':
      return <CallToActionBlockContainer fields={json.fields} />;

    case 'reportbacks':
      return <ReportbackBlock fields={json.fields} reportbacks={json.reportbacks} />;

    case 'static':
      return <StaticBlock fields={json.fields} />;

    default:
      return <PlaceholderBlock />;
  }
};

export default Block;
