import React from 'react';

import Card from '../Card';
import { Figure } from '../Figure';
import Markdown from '../Markdown';
import errorIcon from './errorIcon.svg';

const ErrorBlock = () => (
  <Card className="rounded bordered padded">
    <Figure image={errorIcon}>
      <Markdown>
        __Something went wrong!__ Try refreshing the page or [reach
        out](https://help.dosomething.org/hc/en-us/requests/new) to us.
      </Markdown>
    </Figure>
  </Card>
);

export default ErrorBlock;
