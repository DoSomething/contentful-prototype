import React from 'react';
import classnames from 'classnames';
import { markdown } from "../../helpers";
import './markdown.scss';

const Markdown = ({className = 'markdown', children}) => (
  <div className={classnames('markdown', 'with-lists', className)} dangerouslySetInnerHTML={markdown(children)} />
);

Markdown.propTypes = {
  children: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Markdown;
