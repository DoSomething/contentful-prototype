import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import errorIcon from './error_icon.svg';
import Card from '../../utilities/Card/Card';
import { report } from '../../../helpers/monitoring';
import ErrorDetails from '../../utilities/ErrorDetails';

const ErrorBlock = ({ error }) => {
  // Print error to console & report to New Relic:
  useEffect(() => report(error), [error]);

  return (
    <Card className="rounded bordered p-3">
      <img src={errorIcon} alt="Error" className="mx-auto my-8" />
      <p className="text-center my-4">
        <strong>Something went wrong!</strong> Try refreshing the page - it may
        work the second time. If not, we&apos;ve already noted the problem &amp;
        will try to fix it as soon as possible.
      </p>
      <ErrorDetails error={error} />
    </Card>
  );
};

ErrorBlock.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default ErrorBlock;
