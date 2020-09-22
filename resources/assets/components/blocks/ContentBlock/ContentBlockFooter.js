import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import VoterWidgetBlock from '../VoterWidgetBlock/VoterWidgetBlock';
import GetOutTheVoteBlock from '../GetOutTheVoteBlock/GetOutTheVoteBlock';

const ContentBlockFooter = ({ type }) => {
  switch (type) {
    case 'VoterWidgetBlock':
      return <VoterWidgetBlock />;
    case 'GetOutTheVoteBlock':
      return <GetOutTheVoteBlock />;

    default:
      return <ErrorBlock error={`ContentBlock is unable to render ${type}.`} />;
  }
};

ContentBlockFooter.propTypes = {
  type: PropTypes.string,
};

ContentBlockFooter.defaultProps = {
  type: null,
};

export default ContentBlockFooter;
