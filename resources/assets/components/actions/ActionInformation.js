import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const ActionInformation = ({ className, content, title }) => (
  <div className={className}>
    <Card title={title} className="bordered rounded">
      <TextContent className="p-3">{content}</TextContent>
    </Card>
  </div>
);

ActionInformation.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
};

ActionInformation.defaultProps = {
  className: null,
  content: null,
  title: null,
};

export default ActionInformation;
