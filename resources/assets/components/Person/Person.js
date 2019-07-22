import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import StaffTemplate from './templates/StaffTemplate/StaffTemplate';
import BoardMemberTemplate from './templates/BoardMemberTemplate/BoardMemberTemplate';
import AdvisoryBoardMemberTemplate from './templates/AdvisoryBoardMemberTemplate/AdvisoryBoardMemberTemplate';

export const PersonBlockFragment = gql`
  fragment PersonBlockFragment on PersonBlock {
    name
    type
    active
    jobTitle
    alternatePhoto {
      url(w: 200, h: 200)
      description
    }
    description
  }
`;

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
