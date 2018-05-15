/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { isExternal } from '../../../../helpers';
import Button from '../../../utilities/Button/Button';
import { trackPuckEvent } from '../../../../helpers/analytics';

import './cta-template.scss';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');
  trackPuckEvent('clicked link action', { link });
};

const CTATemplate = props => (
  <Card className="cta-template rounded padded text-centered bg-black dark caps-lock">
    <div className="cta-template__title margin-top-lg">{props.title}</div>

    <div className="cta-template__content margin-bottom-md">
      {props.content}
    </div>

    <Button
      className="margin-bottom-md"
      onClick={() => onLinkClick(props.link)}
    >
      {props.buttonText}
    </Button>
  </Card>
);

CTATemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

CTATemplate.defaultProps = {
  buttonText: "Let's do this!",
};

export default CTATemplate;
