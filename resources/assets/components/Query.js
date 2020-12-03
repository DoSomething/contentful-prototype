import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Spinner from './artifacts/Spinner/Spinner';
import ErrorBlock from './blocks/ErrorBlock/ErrorBlock';

/**
 * Fetch results via GraphQL using the useQuery hook.
 */
const Query = ({ query, variables, children, hideSpinner }) => {
  const { error, loading, data } = useQuery(query, { variables });

  // On initial load, just display a loading spinner.
  if (loading) {
    return hideSpinner ? null : <Spinner className="flex justify-center p-6" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return children(data);
};

Query.propTypes = {
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  variables: PropTypes.object,
  hideSpinner: PropTypes.bool,
};

Query.defaultProps = {
  variables: {},
  hideSpinner: false,
};

export default Query;
