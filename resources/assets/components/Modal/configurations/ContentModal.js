import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';

const ContentModal = ({ content }) => (
  <Card className="bordered padded modal__slide">
    <Markdown>{ content }</Markdown>
  </Card>
);

ContentModal.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ContentModal;
