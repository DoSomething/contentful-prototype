import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { report } from '../../helpers';
import ErrorDetails from '../utilities/ErrorDetails';
import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const ErrorPage = ({ error }) => {
  // Print error to console & report to New Relic:
  useEffect(() => report(error), [error]);

  return (
    <>
      <SiteNavigationContainer />

      <main className="py-20">
        <article className="error-page max-w-xl mx-auto text-center px-4 leading-relaxed mb-8">
          <header className="mb-8">
            <h2 className="text-purple-900 text-xl md:text-2xl mb-2">
              Something went wrong.
            </h2>

            <h3 className="text-lg">
              We&apos;ve noted the problem & will get it fixed soon!
            </h3>
          </header>
          <p className="mb-8">
            Try doing the same thing again - it may work the second time! If
            not, we&apos;ve already noted the problem and our tech team will get
            it fixed as soon as possible! You can also find ways to{' '}
            <a href="/us/campaigns?utm_source=500">Take Action</a> and join a
            movement of 5 million young people making an impact in their
            communities.
          </p>
          <ErrorDetails error={error} />
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default ErrorPage;
