import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import StaffTemplate from './templates/StaffTemplate/StaffTemplate';
import BoardMemberTemplate from './templates/BoardMemberTemplate/BoardMemberTemplate';
import AdvisoryBoardMemberTemplate from './templates/AdvisoryBoardMemberTemplate/AdvisoryBoardMemberTemplate';

export const PersonBlockFragment = gql`
  fragment PersonBlockFragment on PersonBlock {
    id
    name
    type
    active
    jobTitle
    photo {
      url(w: 400, h: 400)
      description
    }
    alternatePhoto {
      url(w: 400, h: 400, fit: FILL)
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
