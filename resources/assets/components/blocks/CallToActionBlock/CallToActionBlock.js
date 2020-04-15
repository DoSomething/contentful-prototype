import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import { tailwind } from '../../../helpers';

const { get } = require('lodash');

const CALL_TO_ACTION_QUERY = gql`
  query CallToActionBlockQuery($id: String!) {
    block(id: $id) {
      id
      ... on CallToActionBlock {
        superTitle
        title
        content
        linkText
        link
        template
        alignment
      }
    }
  }
`;

const CallToActionBlock = ({ id }) => {
  // Make the initial query to get the cta content
  const { data, loading, error } = useQuery(CALL_TO_ACTION_QUERY, {
    variables: { id },
  });

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner" />;
  }

  const {
    superTitle,
    title,
    content,
    linkText,
    link,
    template,
    alignment,
  } = data.block;

  // Define a set of styles, then switch case through them?
  const tailwindPurple = tailwind('colors.purple');
  const tailwindYellow = tailwind('colors.yellow');

  const purpleStyleSet = css`
    background-color: ${tailwindPurple['700']};
    text-align: center;

    h2 {
      color: white;
    }

    h3 {
      color: ${tailwindYellow['500']};
    }

    p {
      color: white;
    }
  `;

  const yellowStyleSet = css`
    background-color: ${tailwindYellow['500']};
    text-align: center;

    h2,
    h3,
    p {
      color: black;
    }
  `;

  const voterRegStyleSet = css`
    background-color: #000047;
    text-align: center;

    h2 {
      color: #00ff75;
    }

    h3 {
      color: ${tailwindYellow['500']};
    }

    p {
      color: white;
    }
  `;

  const leftAlignment = css`
    text-align: left;
  `;

  const centerAlignment = css`
    text-align: center;
  `;

  // Logic goes here
  // Look at Lodash get later
  const styleObject = {
    PURPLE: purpleStyleSet,
    YELLOW: yellowStyleSet,
    VOTER_REGISTRATION: voterRegStyleSet,
  };

  const alignmentObject = {
    LEFT: leftAlignment,
    CENTER: centerAlignment,
  };

  const templateStyles = get(styleObject, template);
  const alignmentStyles = get(alignmentObject, alignment);
  return (
    <div css={[templateStyles, alignmentStyles]}>
      <div className="base-12-grid">
        <div className="grid-narrow my-8">
          <h3 className="text-m font-source-sans font-bold uppercase">
            {superTitle}
          </h3>
          <h2 className="text-4xl font-league-gothic font-bold uppercase">
            {title}
          </h2>
          <p className="text-lg pb-4">{content}</p>
          <a
            href={link}
            className="btn bg-blurple-500 text-white text-lg border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

CallToActionBlock.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CallToActionBlock;
