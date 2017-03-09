import React from 'react';
import { FlexCell } from '../Flex';

const Revealer = (props) => {
  return (
    <FlexCell width={["full"]}>
      <a className="button" onClick={props.onReveal}>{props.title}</a>
    </FlexCell>
  );
};

export default Revealer;
