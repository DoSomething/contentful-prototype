import React from 'react';
import PropTypes from 'prop-types';

import CompanyPageContainer from '../pages/CompanyPage/CompanyPageContainer';
import GeneralPageContainer from '../pages/GeneralPage/GeneralPageContainer';

const PageDispatcher = ({ type }) => {
  switch (type) {
    case 'companyPage':
      return <CompanyPageContainer />;

    default:
      return <GeneralPageContainer />;
  }
};

PageDispatcher.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PageDispatcher;
