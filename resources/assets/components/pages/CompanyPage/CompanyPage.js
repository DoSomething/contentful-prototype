import React from 'react';
import PropTypes from 'prop-types';
import Enclosure from '../../Enclosure';
import TextContent from '../../utilities/TextContent/TextContent';

import '../../../scss/base.scss';
import './company-page.scss';
import '../../../scss/gallery-grid.scss';
import '../../blocks/GalleryBlock/GalleryBlock';

const CompanyPage = props => {
  const { title, subTitle } = props;

  return (
    <div className="company-page">
      <Enclosure className="container margin-bottom-lg ">
        <div className="container bg-white padding-top-lg margin-bottom-lg base-12-grid">
          <h1 className="league-gothic -lg caps-lock grid-wide">{title}</h1>
          <h1 className="league-gothic text-md caps-lock grid-wide">
            {subTitle}
          </h1>
        </div>
        <div className="base-12-grid -p-0">
          <TextContent className="company-page__content bg-white grid-wide p-8">
            {props.content}
          </TextContent>
        </div>
      </Enclosure>
    </div>
  );
};

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default CompanyPage;
