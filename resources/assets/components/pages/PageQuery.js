import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import ErrorPage from './ErrorPage';
import NotFoundPage from './NotFoundPage';
import { env } from '../../helpers';
import Placeholder from '../utilities/Placeholder';

const PageQuery = ({ query, variables, children }) => {
  const { loading, error, data } = useQuery(query, {
    variables: { ...variables, preview: env('CONTENTFUL_USE_PREVIEW_API') },
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!data.page) {
    return <NotFoundPage />;
  }

  return children(data);
};

PageQuery.propTypes = {
  query: PropTypes.object.isRequired,
  variables: PropTypes.object,
  children: PropTypes.func.isRequired,
};

PageQuery.defaultProps = {
  variables: {},
};

export default PageQuery;
