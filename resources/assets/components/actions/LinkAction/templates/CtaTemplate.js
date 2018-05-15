/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { isExternal } from '../../../../helpers';
import Button from '../../../utilities/Button/Button';
import Markdown from '../../../utilities/Markdown/Markdown';
import { trackPuckEvent } from '../../../../helpers/analytics';

import './cta-template.scss';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');
  trackPuckEvent('clicked link action', { link });
};

const CtaTemplate = props => (
  <Card className="cta-template rounded padded text-centered bg-black dark caps-lock">
    <h3 className="cta-template__title margin-top-lg">{props.title}</h3>

    <Markdown className="cta-template__content">{props.content}</Markdown>

    <Button
      className="margin-vertical-md"
      onClick={() => onLinkClick(props.link)}
    >
      {props.buttonText}
    </Button>
  </Card>
);

CtaTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

CtaTemplate.defaultProps = {
  buttonText: "Let's do this!",
};

export default CtaTemplate;
