import React from 'react';
import PropTypes from 'prop-types';

import errorIcon from './errorIcon.svg';
import Card from '../../utilities/Card/Card';
import { Figure } from '../../utilities/Figure/Figure';
import TextContent from '../../utilities/TextContent/TextContent';

const ErrorBlock = ({ error }) => {
  return (
    <Card className="error-block rounded bordered p-3">
      <Figure image={errorIcon}>
        <TextContent>
          __Something went wrong!__ Try refreshing the page or [reach
          out](https://help.dosomething.org/hc/en-us/requests/new) to us.
        </TextContent>
        {error ? <code>{JSON.stringify(error)}</code> : null}
      </Figure>
    </Card>
  );
};

ErrorBlock.propTypes = {
  error: PropTypes.object,
};

ErrorBlock.defaultProps = {
  error: null,
};

export default ErrorBlock;
