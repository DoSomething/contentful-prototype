import React from 'react';
import PropTypes from 'prop-types';

import AccountRoute from './AccountRoute';
import AccountNavigation from './AccountNavigation';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../../SiteNavigation/SiteNavigationContainer';

const Account = props => (
  <>
    <SiteNavigationContainer />

    <main>
      <article className="account-page">
        <header className="base-12-grid bg-gray-100 py-3 md:py-6">
          <div className="grid-wide pt-12">
            <h1 className="font-league-gothic font-normal text-4xl md:text-5xl uppercase">
              Welcome, {props.user.firstName}!
            </h1>
          </div>
        </header>
        <AccountNavigation {...props} />

        <div className="base-12-grid bg-white py-3 md:py-6">
          <AccountRoute {...props} />
        </div>
      </article>
    </main>

    <SiteFooter />
  </>
);

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Account;
