import React from 'react';
import { BlockWrapper } from '../components/Block';
import { Flex, FlexCell } from '../components/Flex';

const NotFound = () => (
  <Flex>
    <FlexCell>
      <BlockWrapper className="placeholder">
        404, Not Found! :(
      </BlockWrapper>
    </FlexCell>
  </Flex>
);

export default NotFound;
