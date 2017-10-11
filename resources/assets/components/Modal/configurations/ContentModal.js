import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';
import { CampaignUpdateContainer } from '../../CampaignUpdate';

const ContentModal = (props) => {
  const { content, title, type, contentfulId } = props;

  const campaignUpdate = (
    <div className="modal__slide">
      <CampaignUpdateContainer id={contentfulId} bordered={false} />
    </div>
  );

  const card = (
    <Card title={title} className="modal__slide">
      <Markdown className="padded">{ content }</Markdown>
    </Card>
  );

  switch (type) {
    case 'campaignUpdate': return campaignUpdate;
    default: return card;
  }
};

ContentModal.propTypes = {
  content: PropTypes.string.isRequired,
  contentfulId: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

ContentModal.defaultProps = {
  title: null,
};

export default ContentModal;
