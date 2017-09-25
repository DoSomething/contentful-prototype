/* eslint-disable react/no-array-index-key */

import React from 'react';
import { chunk } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Output provided markup into specified number of columns.
 */
const ColumnizedContent = ({ content, columnCount = 2, className = null }) => {
  const columns = chunk(content, columnCount);

  return (
    <div>
      { columns.map((column, index) => (
        <div key={index} className={classnames(className)}>
          {column}
        </div>
      ))}
    </div>
  );
};

ColumnizedContent.propTypes = {
  className: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnCount: PropTypes.number,
};

ColumnizedContent.defaultProps = {
  className: null,
  columnCount: 2,
};

export default ColumnizedContent;
