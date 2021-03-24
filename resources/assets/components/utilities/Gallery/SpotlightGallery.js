import React from 'react';
import { get, startCase } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MemberSpotlight from '../MemberSpotlight/MemberSpotlight';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';

const SpotlightGallery = ({ className, colors, items, type }) => (
  <ul
    className={classnames(
      'spotlight-gallery gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3',
      className,
    )}
  >
    {items.map(itemData => {
      switch (type) {
        case 'memberSpotlight':
          return (
            <li key={`${itemData.id}_member_spotlight`}>
              <MemberSpotlight
                age={get(itemData, 'age')}
                campaignTitle={get(itemData, 'campaignTitle')}
                colors={colors}
                content={get(itemData, 'content')}
                data={itemData}
                firstName={get(itemData, 'firstName')}
                image={get(itemData, 'image')}
                memberQuote={get(itemData, 'memberQuote')}
                scholarshipAmount={get(itemData, 'scholarshipAmount')}
              />
            </li>
          );

        default:
          return (
            <ErrorBlock
              error={`${startCase(type)} gallery item component not found.`}
            />
          );
      }
    })}
  </ul>
);

SpotlightGallery.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.shape({
    background: PropTypes.string,
    title: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
};

SpotlightGallery.defaultProps = {
  className: null,
  colors: {},
  type: null,
};

export default SpotlightGallery;
