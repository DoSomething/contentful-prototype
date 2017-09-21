import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';
import Markdown from '../../Markdown';

const PageModal = ({ content }) => (
  <Card className="bordered padded modal__slide">
    <Markdown>{ content }</Markdown>
  </Card>
);

PageModal.propTypes = {
  content: PropTypes.string,
};

PageModal.defaultProps = {
  content: '',
};

export default PageModal;
