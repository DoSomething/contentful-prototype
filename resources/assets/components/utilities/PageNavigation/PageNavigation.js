import React from 'react';
import classnames from 'classnames';

import './page-navigation.scss';

class PageNavigation extends React.Component {
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
          <div className="nav-items">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default PageNavigation;
