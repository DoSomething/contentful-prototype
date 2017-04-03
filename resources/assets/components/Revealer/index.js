import React from 'react';
import { FlexCell } from '../Flex';
import classnames from 'classnames';

import './revealer.scss';

const Revealer = (props) => {
  if (! props.isVisible) {
    return null;
  }

  return (
    <FlexCell width="full">
      <div className="revealer">
        <h1>{props.callToAction}</h1>
        <button disabled={props.isLoading} className={classnames('button', {'is-loading': props.isLoading})} onClick={props.onReveal}>{props.title}</button>
      </div>
    </FlexCell>
  );
};

Revealer.defaultProps = {
  callToAction: '',
  title: 'view more',
  onReveal: () => {},
  isVisible: true,
};

export default Revealer;
