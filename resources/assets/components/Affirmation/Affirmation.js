import React from 'react';
import PropTypes from 'prop-types';

import Highlight from '../Highlight';
import Markdown from '../Markdown';
import { Figure } from '../Figure';
import { ShareContainer } from '../Share';

import './affirmation.scss';

const Affirmation = ({ content }) => (
  <div className="affirmation">
    <div className="affirmation__section affirmation__section-heading">
      <Highlight>{ content.header }</Highlight>
    </div>
    <div className="affirmation__section affirmation__section-quote">
      <Figure image={content.photo} alt={content.author} alignment="left">
        <Markdown>{ content.quote }</Markdown>
        <span>- { content.author }</span>
      </Figure>
    </div>
    <div className="affirmation__section affirmation__section-share">
      <div className="affirmation__block">
        <h3>{ content.callToActionHeader }</h3>
        <p>{ content.callToActionDescription }</p>
      </div>
      <div className="affirmation__block">
        <ShareContainer variant="blue" parentSource="affirmation" />
      </div>
    </div>
  </div>
);

Affirmation.propTypes = {
  content: PropTypes.shape({
    header: PropTypes.string,
    photo: PropTypes.string,
    author: PropTypes.string,
    quote: PropTypes.string,
    callToActionHeader: PropTypes.string,
    callToActionDescription: PropTypes.string,
  }).isRequired,
};

export default Affirmation;
