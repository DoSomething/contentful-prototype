import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const Conclusion = props => {
  const { children, callToAction } = props;

  return (
    <Card className="conclusion rounded bordered padding-lg">
      <div className="conclusion__item -one-third padding-lg">{children}</div>
      <div className="conclusion__item -two-thirds padding-lg">
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
