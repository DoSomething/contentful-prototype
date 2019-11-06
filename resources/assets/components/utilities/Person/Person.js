import React from 'react';
import PropTypes from 'prop-types';

import StaffTemplate from './templates/StaffTemplate/StaffTemplate';
import BoardMemberTemplate from './templates/BoardMemberTemplate/BoardMemberTemplate';
import AdvisoryBoardMemberTemplate from './templates/AdvisoryBoardMemberTemplate/AdvisoryBoardMemberTemplate';

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
          showcaseTitle={props.name}
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
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  jobTitle: PropTypes.string,
  photo: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  alternatePhoto: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
};

Person.defaultProps = {
  name: null,
  description: null,
  jobTitle: null,
  photo: {},
  alternatePhoto: {},
};

export default Person;
