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
      return (
        <StaffTemplate
          showcaseTitle={props.name}
          showcaseDescription={props.jobTitle}
          showcaseImage={props.alternatePhoto}
          {...props}
        />
      );

    case 'board member':
      return (
        <BoardMemberTemplate
          showcaseTitle={props.name}
          showcaseDescription={props.description}
          showcaseImage={props.alternatePhoto}
          {...props}
        />
      );

    case 'advisory board member':
      return (
        <AdvisoryBoardMemberTemplate
          showcaseTitle={props.title}
          showcaseDescription={props.description}
          showcaseImage={props.photo}
          {...props}
        />
      );

    default:
      return null;
  }
};

Person.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  jobTitle: PropTypes.string,
  image: PropTypes.object,
  alternatePhoto: PropTypes.object,
  description: PropTypes.string,
};

Person.defaultProps = {
  type: null,
  name: null,
  title: null,
  jobTitle: null,
  image: null,
  alternatePhoto: null,
  description: null,
};

export default Person;
