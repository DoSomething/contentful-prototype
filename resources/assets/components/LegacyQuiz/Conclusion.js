import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const Conclusion = props => {
  const { children, callToAction } = props;

  return (
    <Card className="conclusion rounded bordered p-6">
      <div className="conclusion__item -one-third p-6">{children}</div>
      <div className="conclusion__item -two-thirds p-6">
        <TextContent className="conclusion__cta">{callToAction}</TextContent>
      </div>
    </Card>
  );
};

Conclusion.propTypes = {
  children: PropTypes.node.isRequired,
  callToAction: PropTypes.string.isRequired,
};

export default Conclusion;
