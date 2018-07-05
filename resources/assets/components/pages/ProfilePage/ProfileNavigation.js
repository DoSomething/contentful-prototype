import React from 'react';

import { MEDIA_MEDIUM_SIZE_MIN } from '../../../constants';
import { NavLink } from 'react-router-dom';
import Enclosure from '../../Enclosure';
import Account from './Account';

class ProfileNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.isAnimatingFrame = false;
  }

  state = {
    isStuck: true,
  };

  componentDidMount = () => {
    // @TODO: Revist setting state here after making action and
    // community pages are created for all campaigns.
    this.updateState();

    window.addEventListener('scroll', this.onScroll, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    if (window.innerWidth <= MEDIA_MEDIUM_SIZE_MIN) {
      return;
    }
    this.requestFrame();
  };

  requestFrame = () => {
    if (!this.isAnimatingFrame) {
      window.requestAnimationFrame(this.updateState);
    }

    this.isAnimatingFrame = true;
  };
  updateState = () => {
    this.isAnimatingFrame = false;
  };

  render() {
    let thing;
    if (accountActive) {
      thing = <Account />;
    } else {
      thing = <TestCampaign />;
    }

    return (
      <div id="page-navigation" className="page-navigation">
        <div className="wrapper">
          <div className="nav-items">
            <NavLink
              className="nav-link"
              activeClassName="is-active"
              to="/us/profile/account"
            >
              Account
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="is-active"
              to="/us/profile/campaigns"
            >
              Campaigns
            </NavLink>
            <Enclosure className="default-container margin-top-lg margin-bottom-lg">
              <Account />
            </Enclosure>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileNavigation;
