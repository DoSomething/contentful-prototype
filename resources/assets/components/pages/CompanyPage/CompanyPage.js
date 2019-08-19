import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';
import '../../../scss/base.scss';
import './company-page.scss';
import '../../../scss/gallery-grid.scss';
import '../../blocks/GalleryBlock/GalleryBlock';

const display = content => {
  content.map(item => {
    console.log(item);
  });
};
const TAG = what => {
  console.log('TAGGED: ', what);
};

const CompanyPage = props => {
  const { title } = props;

  TAG(props.content.content);
  return (
    <div className="base-12-grid">
      <h1 className="company-page__background-title">{title}</h1>
      <TextContent className="grid-main gallery-grid-quartet">
        {props.content}
      </TextContent>
    </div>
  );
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default CompanyPage;
