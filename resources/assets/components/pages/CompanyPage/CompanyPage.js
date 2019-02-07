import React from 'react';
import PropTypes from 'prop-types';

const CompanyPage = props => {
  const { title } = props;

  return <div>{title}</div>;
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CompanyPage;
