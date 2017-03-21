import React from 'react';
import { FlexCell } from '../Flex';
import './affirmation.scss';

const Affirmation = ({ title, description }) => {
  return (
    <FlexCell width="full">
      <div className="affirmation">
        <h1>{ title }</h1>
        <p>{ description }</p>
      </div>
    </FlexCell>
  );
};

Affirmation.defaultProps = {
  title: 'THANKS SO MUCH!',
  description: 'Share this campaign with everyone you know because you are just that awesome',
};

export default Affirmation;
