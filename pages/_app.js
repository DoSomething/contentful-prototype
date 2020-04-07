import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import '../resources/assets/tailwind.css';

const Chrome = styled.div`
  ${tw`w-full relative bg-white mx-auto overflow-auto`}

  max-width: 1440px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

function Application({ Component, pageProps }) {
  return (
    <Chrome>
      <Component {...pageProps} />
    </Chrome>
  );
}

export default Application;
