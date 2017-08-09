import React from 'react';
import Card from '../Card';
import Markdown from '../Markdown';

const copy = "# Look it's a quiz!";

const Quiz = () => (
  <Card classNames="rounded bordered" title="Quiz">
    <div className="quiz">
      <Markdown>{copy}</Markdown>
    </div>
  </Card>
);

export default Quiz;
