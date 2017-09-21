/* @flow */

import React, { Element } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './block-wrapper.scss';

type BlockTitleProps = {
  shareLink: ?string,
  title: ?string,
};

const BlockTitle = ({ title, shareLink }: BlockTitleProps) => {
  const titleElement = shareLink ? <Link to={shareLink}>{title}</Link> : title;

  return <h4 className="block-wrapper__title">{titleElement}</h4>;
};

type BlockWrapperProps = {
  children: ?Element<any>,
  className: ?string,
  shareLink: ?string,
  title: ?string,
};

const BlockWrapper = ({ title, className, children, shareLink }: BlockWrapperProps) => (
  <article className={classnames('block-wrapper', className)}>
    { title ? <BlockTitle title={title} shareLink={shareLink} /> : null }
    { children }
  </article>
);

export default BlockWrapper;
