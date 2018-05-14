import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../../utilities/Card/Card';
import Button from '../../../utilities/Button/Button';

import './cta-template.scss';

const CallToAction = props => (
  <Card className="cta-template rounded padded text-centered bg-black dark caps-lock">
    <div className="cta-template__title margin-top-lg">{props.title}</div>

    <div className="cta-template__content margin-bottom-md">
      {props.content}
    </div>

    <a className="button margin-bottom-md" href={props.link}>
      {props.buttonText}
    </a>
  </Card>
);

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

CallToAction.defaultProps = {
  buttonText: "Let's do this!",
};

export default CallToAction;
