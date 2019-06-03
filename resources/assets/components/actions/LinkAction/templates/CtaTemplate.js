/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Button from '../../../utilities/Button/Button';
import { isExternal, dynamicString } from '../../../../helpers';
import { trackAnalyticsEvent } from '../../../../helpers/analytics';
import TextContent from '../../../utilities/TextContent/TextContent';

import './cta-template.scss';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');

  trackAnalyticsEvent({
    context: { url: link },
    metadata: {
      category: 'campaign_action',
      noun: 'link_action',
      target: 'button',
      verb: 'clicked',
    },
  });
};

const CtaTemplate = ({ title, content, link, buttonText, source }) => {
  const href = dynamicString(link, {
    source,
  });

  return (
    <Card className="cta-template rounded padded text-center bg-black dark caps-lock">
      <h3 className="cta-template__title margin-top-lg">{title}</h3>

      <TextContent className="cta-template__content">{content}</TextContent>

      <Button className="margin-vertical-md" onClick={() => onLinkClick(href)}>
        {buttonText}
      </Button>
    </Card>
  );
};

CtaTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  source: PropTypes.string,
};

CtaTemplate.defaultProps = {
  buttonText: "Let's do this!",
  source: 'web',
};

export default CtaTemplate;
