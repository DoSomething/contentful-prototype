import React from 'react';
import PropTypes from 'prop-types';

import StoryPage from '../pages/StoryPage/StoryPage';
import CompanyPage from '../pages/CompanyPage/CompanyPage';
import GeneralPage from '../pages/GeneralPage/GeneralPage';

const PageDispatcher = props => {
  switch (props.type) {
    default:
      return <CompanyPage {...props.fields} />;
  }
};

PageDispatcher.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default PageDispatcher;
