/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Button from '../../../utilities/Button/Button';
import { isExternal, dynamicString } from '../../../../helpers';
import { trackAnalyticsEvent } from '../../../../helpers/analytics';
import TextContent from '../../../utilities/TextContent/TextContent';

import './cta-template.scss';

const onLinkClick = (link, context) => {
  window.open(link, isExternal(link) ? '_blank' : '_self');

  trackAnalyticsEvent({
    context: { ...context, url: link },
    metadata: {
      category: 'campaign_action',
      noun: 'link_action',
      target: 'button',
      verb: 'clicked',
    },
  });
};

const CtaTemplate = ({
  buttonText,
  campaignId,
  content,
  id,
  link,
  pageId,
  source,
  title,
}) => {
  const href = dynamicString(link, {
    source,
  });

  const context = { blockId: id, campaignId, pageId };

  return (
    <Card className="cta-template rounded p-3 text-center bg-black dark caps-lock">
      <h3 className="cta-template__title margin-top-lg">{title}</h3>

      <TextContent className="cta-template__content">{content}</TextContent>

      <Button
        className="margin-vertical-md"
        onClick={() => onLinkClick(href, context)}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

CtaTemplate.propTypes = {
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
};

CtaTemplate.defaultProps = {
  buttonText: "Let's do this!",
  campaignId: null,
  pageId: null,
  source: 'web',
};

export default CtaTemplate;
