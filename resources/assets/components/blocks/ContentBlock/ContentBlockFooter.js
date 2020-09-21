import React from 'react';
import PropTypes from 'prop-types';

import VoterWidgetBlock from '../VoterWidgetBlock/VoterWidgetBlock';
import GetOutTheVoteBlock from '../GetOutTheVoteBlock/GetOutTheVoteBlock';

const ContentBlockFooter = ({ type }) => {
  switch (type) {
    case 'VoterWidgetBlock':
      return <VoterWidgetBlock />;
    case 'GetOutTheVoteBlock':
      return <GetOutTheVoteBlock />;

    default:
      return null;
  }
};

ContentBlockFooter.propTypes = {
  type: PropTypes.string,
};

ContentBlockFooter.defaultProps = {
  type: null,
};

export default ContentBlockFooter;
