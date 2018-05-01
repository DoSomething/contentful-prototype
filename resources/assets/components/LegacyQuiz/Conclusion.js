import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utilities/Card/Card';
import Markdown from '../utilities/Markdown/Markdown';

const Conclusion = props => {
  const { children, callToAction } = props;

  return (
    <Card className="conclusion rounded bordered padding-lg">
      <div className="conclusion__item -one-third padding-lg">{children}</div>
      <div className="conclusion__item -two-thirds padding-lg">
        <Markdown className="conclusion__cta">{callToAction}</Markdown>
      </div>
    </Card>
  );
};

Conclusion.propTypes = {
  children: PropTypes.node.isRequired,
  callToAction: PropTypes.string.isRequired,
};

export default Conclusion;
