import React from 'react';
import classnames from 'classnames';
import { FlexCell } from '../Flex';

import './revealer.scss';

const Revealer = (props) => {
  if (! props.isVisible) {
    return null;
  }

  return (
    <FlexCell width="full">
      <div className="revealer">
        <h1>{props.callToAction}</h1>
        <button disabled={props.isLoading} className={classnames('button', { 'is-loading': props.isLoading })} onClick={props.onReveal}>{props.title}</button>
      </div>
    </FlexCell>
  );
};

Revealer.propTypes = {
  callToAction: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  isVisible: React.PropTypes.bool,
  onReveal: React.PropTypes.func,
  title: React.PropTypes.string,
};

Revealer.defaultProps = {
  callToAction: '',
  isLoading: false,
  isVisible: true,
  onReveal: () => {},
  title: 'view more',
};

export default Revealer;
