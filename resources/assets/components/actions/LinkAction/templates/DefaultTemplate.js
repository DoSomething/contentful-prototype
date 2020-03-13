import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Embed from '../../../utilities/Embed/Embed';
import { dynamicString } from '../../../../helpers';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import TextContent from '../../../utilities/TextContent/TextContent';
import AffiliatePromotion from '../../../utilities/AffiliatePromotion/AffiliatePromotion';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const analyzeClick = (link, context) => {
  trackAnalyticsEvent('clicked_link_action', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.campaignAction,
    label: 'link_action',
    context: { ...context, url: link },
  });
};

const DefaultTemplate = props => {
  const {
    affiliateLogo,
    buttonText,
    campaignId,
    content,
    id,
    link,
    pageId,
    source,
    title,
    userId,
  } = props;

  const href = dynamicString(link, {
    userId,
    northstarId: userId, // @TODO: Remove!
    campaignId,
    campaignRunId: 0,
    source,
  });

  const context = { blockId: id, campaignId, pageId };

  // If no content is provided, show as an embed.
  if (!content) {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={() => analyzeClick(href, context)}
        className="link-wrapper"
      >
        <Embed url={link} badged />
        {affiliateLogo ? (
          <AffiliatePromotion
            className="affiliate-logo -padded"
            imgUrl={affiliateLogo.url}
            title={affiliateLogo.description}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="link-action">
      <Card title={title} className="bordered rounded">
        {content ? <TextContent className="p-3">{content}</TextContent> : null}

        {affiliateLogo ? (
          <AffiliatePromotion
            className="text-black p-3"
            imgUrl={affiliateLogo.url}
            title={affiliateLogo.description}
          />
        ) : null}

        <ButtonLink
          attached
          link={href}
          onClick={() => analyzeClick(href, context)}
        >
          {buttonText}
        </ButtonLink>
      </Card>
    </div>
  );
};

DefaultTemplate.propTypes = {
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

DefaultTemplate.defaultProps = {
  affiliateLogo: null,
  buttonText: 'Visit Link',
  campaignId: null,
  content: null,
  pageId: null,
  source: 'web',
  userId: null,
};

export default DefaultTemplate;
