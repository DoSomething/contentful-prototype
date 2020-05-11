import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { dynamicString } from '../../../../helpers';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';
import TextContent from '../../../utilities/TextContent/TextContent';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

import './cta-template.scss';

/**
 * @deprecated This template component is being deprecated in favor of the CallToActionBlock.
 */
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

      <PrimaryButton
        className="my-3"
        href={href}
        onClick={() =>
          trackAnalyticsEvent('clicked_link_action', {
            action: 'button_clicked',
            category: EVENT_CATEGORIES.campaignAction,
            label: 'link_action',
            context: { ...context, url: href },
          })
        }
        text={buttonText}
      />
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
