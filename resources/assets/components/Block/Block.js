/* @flow */

import React from 'react';
import { CampaignUpdateBlockContainer } from '../CampaignUpdateBlock';
import { CampaignUpdate } from '../CampaignUpdate';
import PlaceholderBlock from '../PlaceholderBlock';
import ReportbackBlock from '../ReportbackBlock';
import StaticBlock from '../StaticBlock';
import Quiz from '../Quiz';
import CallToActionBlockContainer from '../../containers/CallToActionBlockContainer';
import { BlockJson } from '../../types';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: BlockJson = { fields: { type: null } };

const Block = ({ json = DEFAULT_BLOCK }: { json: BlockJson }) => {
  switch (json.type) {
    case 'campaignUpdate':
      return (
        <CampaignUpdate
          id={json.id}
          displayOptions={json.fields.displayOptions}
          content={json.fields.content}
          author={json.fields.author}
        />
      );

    case 'quiz':
      return <Quiz />;

    case 'campaign_update':
      return <CampaignUpdateBlockContainer id={json.id} fields={json.fields} />;

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
