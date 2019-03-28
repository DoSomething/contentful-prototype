import React from 'react';

import { Figure } from '../Figure';
import errorIcon from './errorIcon.svg';
import Card from '../utilities/Card/Card';
import TextContent from '../utilities/TextContent/TextContent';

const ErrorBlock = () => (
  <Card className="error-block rounded bordered padded margin-bottom-lg grid-main">
    <Figure image={errorIcon}>
      <TextContent>
        __Something went wrong!__ Try refreshing the page or [reach
        out](https://help.dosomething.org/hc/en-us/requests/new) to us.
      </TextContent>
    </Figure>
  </Card>
);

export default ErrorBlock;
