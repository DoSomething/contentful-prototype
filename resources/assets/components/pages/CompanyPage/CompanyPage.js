import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';

const CompanyPage = props => {
  const { title } = props;

  return (
    <div>
      <h1>{title}</h1>
      <TextContent>{props.content}</TextContent>
    </div>
  );
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default CompanyPage;
