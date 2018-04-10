import PropTypes from 'prop-types';
import React from 'react';
import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';

/**
 * Render the block page.
 *
 * @returns {XML}
 */
const BlockPage = ({ json }) => (
  <div className="main clearfix">
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <ContentfulEntry json={json} />
      <ul className="form-actions">
        <li>
          <a href=".." className="button -tertiary">
            or take another action
          </a>
        </li>
      </ul>
    </Enclosure>
  </div>
);

BlockPage.propTypes = {
  json: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BlockPage.defaultProps = {
  json: null,
};

export default BlockPage;
