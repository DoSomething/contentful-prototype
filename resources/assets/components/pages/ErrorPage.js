import React from 'react';
import PropTypes from 'prop-types';

import { report } from '../../helpers';
import { HELP_REQUEST_LINK } from '../../constants';
import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const DEBUGGING = process.env.NODE_ENV !== 'production';

const ErrorPage = ({ error }) => {
  // Print error to console & report to New Relic:
  if (error) {
    console.error(`[ErrorPage] ${error}`);
    report(error);
  }

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
          <p className="text-sm text-gray-800 m-0">
            If you continue to run into problems, contact our{' '}
            <a
              href={HELP_REQUEST_LINK}
              className="font-semibold text-gray-800 hover:text-gray-400 underline"
            >
              support squad
            </a>
            !
          </p>
          {DEBUGGING && error ? (
            <p className="color-error text-center my-4">
              <code>{JSON.stringify(error)}</code>
            </p>
          ) : null}
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

ErrorPage.defaultProps = {
  error: null,
};

export default ErrorPage;
