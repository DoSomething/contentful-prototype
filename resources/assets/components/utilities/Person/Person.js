import React from 'react';
import PropTypes from 'prop-types';

import StaffTemplate from './templates/StaffTemplate/StaffTemplate';
import BoardMemberTemplate from './templates/BoardMemberTemplate/BoardMemberTemplate';
import AdvisoryBoardMemberTemplate from './templates/AdvisoryBoardMemberTemplate/AdvisoryBoardMemberTemplate';

const Person = props => {
  switch (props.type) {
    case 'staff':
      return <StaffTemplate {...props} />;

    case 'board member':
      return <BoardMemberTemplate {...props} />;

    case 'advisory board member':
      return <AdvisoryBoardMemberTemplate {...props} />;

    default:
      return null;
  }
};

Person.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Person;
