/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Button from '../../../utilities/Button/Button';
import Markdown from '../../../utilities/Markdown/Markdown';
import { trackPuckEvent } from '../../../../helpers/analytics';
import { isExternal, dynamicString } from '../../../../helpers';

import './cta-template.scss';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');
  trackPuckEvent('clicked link action', { link });
};

const CtaTemplate = ({ title, content, link, buttonText, source }) => {
  const href = dynamicString(link, {
    source,
  });

  return (
    <Card className="cta-template rounded padded text-centered bg-black dark caps-lock">
      <h3 className="cta-template__title margin-top-lg">{title}</h3>

      <Markdown className="cta-template__content">{content}</Markdown>

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
