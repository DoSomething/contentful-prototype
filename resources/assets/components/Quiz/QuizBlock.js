import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import QuizResult from './QuizResult';
import Quiz, { QuizBlockFragment } from './Quiz';
import { useGate, isAuthenticated } from '../../helpers/auth';
import ScrollConcierge from '../ScrollConcierge';
import Spinner from '../artifacts/Spinner/Spinner';

export const QUIZ_QUERY = gql`
  query QuizBlockQuery($id: String!) {
    block(id: $id) {
      id
      ...QuizBlockFragment
    }
  }

  ${QuizBlockFragment}
`;

const QuizBlock = props => {
  // If we're returning from an authentication redirect, go to "intended"
  // block. Otherwise, start at the beginning of this quiz:
  const [flash, authenticate] = useGate(`QuizBlock:${props.id}`);
  const [id, setCurrentId] = useState(flash.id || props.id);

  const hasNavigated = id !== props.id;

  const { data, loading } = useQuery(QUIZ_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <Spinner className="mx-auto my-6" />;
  }

  // If a quiz navigates us to a result block, require login:
  const showingResult = data.block.__typename !== 'QuizBlock';
  if (showingResult && !isAuthenticated()) {
    authenticate({ id });

    return <Spinner className="mx-auto my-6" />;
  }

  return (
    <div className="mx-3">
      {hasNavigated ? <ScrollConcierge trigger={id} /> : null}
      {data.block.__typename === 'QuizBlock' ? (
        <Quiz {...data.block} onComplete={setCurrentId} />
      ) : (
        <QuizResult id={id} campaignId={props.additionalContent.campaignId} />
      )}
    </div>
  );
};

QuizBlock.propTypes = {
  id: PropTypes.string.isRequired,
  additionalContent: PropTypes.shape({
    campaignId: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuizBlock;
