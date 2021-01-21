import React from 'react';
import PropTypes from 'prop-types';
import { isBefore } from 'date-fns';

import Card from '../../../utilities/Card/Card';
import Embed from '../../../utilities/Embed/Embed';
import { getUserId } from '../../../../helpers/auth';
import { dynamicString } from '../../../../helpers/data';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';
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
    createdAt,
    id,
    link,
    pageId,
    source,
    title,
  } = props;

  const userId = getUserId();

  const href = dynamicString(link, {
    userId,
    northstarId: userId, // @TODO: Remove!
    campaignId,
    campaignRunId: 0,
    source,
  });

  const context = { blockId: id, campaignId, pageId };

  // If no content is provided, show as an embed.
  // HACK: We've deprecated this functionality in favor of using the Embed Block.
  // This will now only apply to Link Actions created before 01/22/2021.
  if (!content && isBefore(createdAt, new Date('01/22/2021'))) {
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
        <div className="p-3">
          {content ? (
            <TextContent className="mb-3">{content}</TextContent>
          ) : null}

          {affiliateLogo ? (
            <AffiliatePromotion
              className="text-black mb-3"
              imgUrl={affiliateLogo.url}
              title={affiliateLogo.description}
            />
          ) : null}

          <PrimaryButton
            className="block mt-6 text-lg w-full"
            href={href}
            onClick={() => analyzeClick(href, context)}
            text={buttonText}
          />
        </div>
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
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
};

DefaultTemplate.defaultProps = {
  affiliateLogo: null,
  buttonText: 'Visit Link',
  campaignId: null,
  content: null,
  pageId: null,
  source: 'web',
};

export default DefaultTemplate;
