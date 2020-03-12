import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ArticleLede = styled.div`
  ::after {
    content: '';

    ${tw`block my-12 h-1`}
    background: linear-gradient(
      to right,
      #23b7fb 0%,
      #23b7fb 33.3%,
      #4e2b63 33.3%,
      #4e2b63 66.6%,
      #fcd116 66.6%,
      #fcd116 100%
    );
  }
`;

const ArticleTitle = tw.h1`text-black font-league-gothic font-normal text-2xl md:text-4xl lg:text-5xl lg:text-5xl text-center uppercase`;
const ArticleSubtitle = tw.p`text-black font-source-sans font-bold md:text-xl text-center`;

const ArticleHeader = ({ title, subtitle, children }) => (
  <ArticleLede>
    <ArticleTitle>{title}</ArticleTitle>
    {subtitle ? <ArticleSubtitle>{subtitle}</ArticleSubtitle> : null}
    {children ? <div className="mx-3 my-6 text-center">{children}</div> : null}
  </ArticleLede>
);

ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

ArticleHeader.defaultProps = {
  subtitle: null,
  children: null,
};

export default ArticleHeader;
