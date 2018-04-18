import React from 'react';
import classnames from 'classnames';

import './subpage-navigation.scss';

class SubPageNavigation extends React.Component {
  state = {
    isStuck: true,
  };

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  onScroll = () => {};

  requestFrame = () => {};

  render() {
    return (
      <div
        id="tabbed-navigation"
        className={classnames('tabbed-navigation', {
          'is-stuck': this.state.isStuck,
        })}
      >
        <div className="wrapper">
          <div className="nav-items">hello</div>
        </div>
      </div>
    );
  }
}

export default SubPageNavigation;
