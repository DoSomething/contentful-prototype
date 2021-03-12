import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const ActionInformation = ({ className, content, title }) => (
  <div data-testid="action-information" className={className}>
    <Card title={title} className="bordered rounded">
      <TextContent className="p-3">{content}</TextContent>
    </Card>
  </div>
);

ActionInformation.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ActionInformation.defaultProps = {
  className: null,
};

export default ActionInformation;
