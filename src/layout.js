import tw from 'twin.macro';
import styled from '@emotion/styled';

import './layout.css';

const Layout = styled.div`
  ${tw`w-full relative bg-white mx-auto overflow-auto`}
  max-width: 1440px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export default Layout;
