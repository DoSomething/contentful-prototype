import React from 'react';
import PropTypes from 'prop-types';

import StoryPage from '../pages/StoryPage/StoryPage';
import CompanyPage from '../pages/CompanyPage/CompanyPage';
import GeneralPage from '../pages/GeneralPage/GeneralPage';

const PageDispatcher = props => {
  switch (props.type) {
    case 'companyPage':
      return <CompanyPage {...props.fields} />;

    case 'storyPage':
      return <StoryPage {...props.fields} />;

    default:
      return (
        <GeneralPage
          {...props.fields}
          authUrl={props.authUrl}
          isAuthenticated={props.isAuthenticated}
        />
      );
  }
};

PageDispatcher.propTypes = {
  authUrl: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

PageDispatcher.defaultProps = {
  authUrl: null,
};

export default PageDispatcher;
