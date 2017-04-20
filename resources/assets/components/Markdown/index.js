import React from 'react';
import classnames from 'classnames';
import { markdown } from '../../helpers';

import './markdown.scss';

const Markdown = ({ className = null, children }) => (
  <div className={classnames('markdown', 'with-lists', className)} dangerouslySetInnerHTML={markdown(children)} />
);

Markdown.propTypes = {
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};

Markdown.defaultProps = {
  className: null,
};

export default Markdown;
