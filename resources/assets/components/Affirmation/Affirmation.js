import React from 'react';
import PropTypes from 'prop-types';

import Byline from '../Byline';
import Card from '../Card';
import { Flex, FlexCell } from '../Flex';
import Markdown from '../Markdown';
import { ShareContainer } from '../Share';

import './affirmation.scss';

const Affirmation = ({ closeModal, content }) => (
  <Card className="affirmation rounded" title="Thanks for joining us!" onClose={closeModal}>
    <Markdown className="padded">{content.quote}</Markdown>
    <Flex className="flex-align-center">
      <FlexCell className="affirmation__cta padded" width="half">
        <h3>{ content.callToActionHeader }</h3>
        <p>{ content.callToActionDescription }</p>
      </FlexCell>
      <FlexCell className="padded" width="half">
        <ShareContainer variant="blue" parentSource="affirmation" />
      </FlexCell>
    </Flex>
    <Byline author={content.author.fields.name} {...content.author.fields} className="padded" />
  </Card>
);

Affirmation.propTypes = {
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.shape({
    header: PropTypes.string,
    photo: PropTypes.string,
    author: PropTypes.object,
    quote: PropTypes.string,
    callToActionHeader: PropTypes.string,
    callToActionDescription: PropTypes.string,
  }).isRequired,
};

export default Affirmation;
