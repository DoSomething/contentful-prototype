import React from 'react';
import Block from '../components/Block';
import { Flex, FlexCell } from '../components/Flex';

const NotFound = (props) => (
  <Flex>
    <FlexCell>
      <Block className="placeholder">
        404, Not Found! :(
      </Block>
    </FlexCell>
  </Flex>
);

export default NotFound;
