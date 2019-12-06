/* global window */
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useRef } from 'react';
import useScript, { ScriptStatus } from '@charlietango/use-script';

import Card from '../utilities/Card/Card';
import Spinner from '../artifacts/Spinner/Spinner';
import { makeUrl, withoutNulls } from '../../helpers';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';

export const SoftEdgeBlockFragment = gql`
  fragment SoftEdgeBlockFragment on SoftEdgeBlock {
    title
    actionId
    softEdgeId
  }
`;

const CONGRESSWEB_SDK =
  'https://www.congressweb.com/cweb/js/jquery.congressweb.iframe.js';

const SOFT_EDGE_AUTOFILL_QUERY = gql`
  query SoftEdgeAutofillQuery($userId: String!) {
    user(id: $userId) {
      memberId: id
      firstName
      lastName
      email
      mobile
      address: addrStreet1
      city: addrCity
      state: addrState
      zip: addrZip
    }
  }
`;

const SoftEdgeBlock = ({ actionId, softEdgeId, title }) => {
  const userId = window.AUTH.id;

  const element = useRef(null);

  // 1. Make sure we've loaded the CongressWeb SDK:
  const [ready, scriptStatus] = useScript(CONGRESSWEB_SDK);

  // 2. If logged in, grab user fields to pre-fill form:
  const { data, loading } = useQuery(SOFT_EDGE_AUTOFILL_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  // 3. If we couldn't load CongressWeb SDK, show an error block:
  if (scriptStatus === ScriptStatus.ERROR) {
    return <ErrorBlock error="Could not connect to CongressWeb." />;
  }

  // 4. Once #1 & #2 are done, load the IFrame:
  useEffect(() => {
    if (!ready || loading) {
      return;
    }

    // If anonymous (or GraphQL error'd), don't pre-fill:
    const prefill = data ? data.user : {};

    // We'll encode the user's profile data & action ID into
    // the query-string for the SoftEdge form to pre-fill:
    const query = withoutNulls({
      acceptAuthor: true,
      externalActionId: actionId,
      ...prefill,
    });

    // Finally, use the third-party SDK to render into the ref:
    const baseUrl = `https://www.congressweb.com/dosomething/${softEdgeId}`;
    window.$cweb(element.current).congressweb({
      url: makeUrl(baseUrl, query).toString(),
      responsive: true,
    });
  }, [ready, loading]);

  return (
    <Card className="bordered rounded" title={title}>
      {!ready || loading ? (
        <Spinner className="flex justify-center p-16" />
      ) : (
        <div ref={element} />
      )}
    </Card>
  );
};

SoftEdgeBlock.propTypes = {
  softEdgeId: PropTypes.number.isRequired,
  actionId: PropTypes.number.isRequired,
  title: PropTypes.string,
};

SoftEdgeBlock.defaultProps = {
  title: null,
};

export default SoftEdgeBlock;
