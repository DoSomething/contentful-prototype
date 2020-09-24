import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import GetOutTheVoteBlock from '../GetOutTheVoteBlock/GetOutTheVoteBlock';
import RequestBallotBlock from '../RequestBallotBlock/RequestBallotBlock';

const ContentBlockFooter = ({ type }) => {
  switch (type) {
    case 'GetOutTheVoteBlock':
      return <GetOutTheVoteBlock />;

    case 'RequestBallotBlock':
      return <RequestBallotBlock />;

    default:
      return (
        <ErrorBlock
          error={`Invalid footerType "${type}". Valid values: "GetOutTheVoteBlock", "RequestBallotBlock"`}
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
