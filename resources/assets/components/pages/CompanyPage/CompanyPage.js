import React from 'react';
import PropTypes from 'prop-types';
import './company-page.scss';
import '../../../scss/base.scss';

import TextContent from '../../utilities/TextContent/TextContent';

const CompanyPage = props => {
  const { title, subTitle } = props;
  delete props.content.content[0];

  return (
    <div className="container bg-gray margin-bottom-lg">
      <div className="container bg-white padding-top-lg padding-horizontal-md">
        <h1>{title}</h1>
        <h3>{subTitle}</h3>
      </div>
      <div className="company-page bg-white margin-top-lg">
        <div className="">
          <TextContent>{props.content}</TextContent>
        </div>
      </div>
    </div>
  );
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default CompanyPage;
