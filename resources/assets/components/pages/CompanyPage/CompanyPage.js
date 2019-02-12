import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../utilities/Markdown/Markdown';

const CompanyPage = props => {
  const { title } = props;

  return (
    <div>
      <h1>{title}</h1>
      <Markdown>{props.content}</Markdown>
    </div>
  );
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CompanyPage;
