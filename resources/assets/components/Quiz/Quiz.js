import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';
import { makeHash } from '../../helpers';

const Quiz = ({ fields }) => (
  <div className="quiz">
    <h1 className="quiz__title">{fields.title}</h1>
    { fields.introduction ? <Markdown>{fields.introduction}</Markdown> : null }
    { fields.json.questions.map(question => (
      <Question key={makeHash(question.title)} question={question} />
    )) }
    { fields.conclusion ? <Markdown>{fields.conclusion}</Markdown> : null }
  </div>
);

Quiz.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    json: PropTypes.object,
  }).isRequired,
};

export default Quiz;
