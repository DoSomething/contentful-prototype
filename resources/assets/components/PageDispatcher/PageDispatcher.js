import React from 'react';
import PropTypes from 'prop-types';

import CompanyPage from '../pages/CompanyPage/CompanyPage';
import GeneralPage from '../pages/GeneralPage/GeneralPage';

const PageDispatcher = props => {
  switch (props.type) {
    case 'companyPage':
      return <CompanyPage {...props.fields} />;

    default:
      return <GeneralPage {...props.fields} />;
  }
};

PageDispatcher.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PageDispatcher;
