/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Button from '../../../utilities/Button/Button';
import { isExternal, dynamicString } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

import './cta-template.scss';

const onLinkClick = (link, context) => {
  window.open(link, isExternal(link) ? '_blank' : '_self');

  trackAnalyticsEvent('clicked_link_action', {
    action: 'button_clicked',
    category: EVENT_CATEGORIES.campaignAction,
    label: 'link_action',
    context: { ...context, url: link },
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
    <Card className="cta-template p-3 rounded text-center bg-black-important dark uppercase">
      <h3 className="cta-template__title mt-6">{title}</h3>

      <TextContent className="cta-template__content">{content}</TextContent>

      <Button className="my-3" onClick={() => onLinkClick(href, context)}>
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
