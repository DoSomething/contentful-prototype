import React from 'react';
import { NavLink } from 'react-router-dom';

import Enclosure from '../../Enclosure';
import Account from './Account';
import TestCampaign from './TestCampaign';

class AccountNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accountActive: true };
    this.handleCampaignClick = this.handleCampaignClick.bind(this);
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  handleCampaignClick() {
    this.setState({ accountActive: false });
  }
  handleAccountClick() {
    this.setState({ accountActive: true });
  }

  render() {
    let component;
    if (this.state.accountActive) {
      component = <Account {...this.props} />;
    } else {
      component = <TestCampaign />;
    }

    return (
      <div>
        <div className="container bg-white padding-top-lg">
          <div className="wrapper">
            <div className="margin-bottom-lg">
              <h1 className="league-gothic-lg caps-lock">
                Welcome, {this.props.user.firstName}!
              </h1>
              <div id="page-navigation" className="page-navigation bg-white">
                <div className="nav-items">
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/us/profile/campaigns"
                    onClick={this.handleCampaignClick}
                  >
                    Campaigns
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/us/profile/info"
                    onClick={this.handleAccountClick}
                  >
                    Account
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-gray margin-top-lg">
          <div className="wrapper bg-gray">
            <Enclosure className="">{component}</Enclosure>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountNavigation;
