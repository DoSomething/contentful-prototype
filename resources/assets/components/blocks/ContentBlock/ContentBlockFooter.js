import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import GetOutTheVoteBlock from '../GetOutTheVoteBlock/GetOutTheVoteBlock';
import CivicEngineVoterWidget from '../../utilities/CivicEngineVoterWidget/CivicEngineVoterWidget';

const ContentBlockFooter = ({ type }) => {
  switch (type) {
    case 'GetOutTheVoteBlock':
      return <GetOutTheVoteBlock />;

    case 'CivicEngineVoterWidget':
      return <CivicEngineVoterWidget />;

    default:
      return (
        <ErrorBlock
          error={`Invalid footerType "${type}". Valid values: "GetOutTheVoteBlock", "CivicEngineVoterWidget"`}
        />
      );
  }
};

ContentBlockFooter.propTypes = {
  type: PropTypes.string,
};

ContentBlockFooter.defaultProps = {
  type: null,
};

export default ContentBlockFooter;
