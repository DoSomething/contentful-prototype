import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { env, tailwind } from '../../../helpers';
import Spinner from '../../artifacts/Spinner/Spinner';
import PrimaryButton from '../../utilities/Button/PrimaryButton';

const CALL_TO_ACTION_QUERY = gql`
  query CallToActionBlockQuery($id: String!, $preview: Boolean!) {
    block(id: $id, preview: $preview) {
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
  const { data, loading, error } = useQuery(CALL_TO_ACTION_QUERY, {
    variables: { id, preview: env('CONTENTFUL_USE_PREVIEW_API', false) },
  });

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (loading) {
    return <Spinner className="flex justify-center p-2" />;
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

  const tailwindPurple = tailwind('colors.purple');
  const tailwindYellow = tailwind('colors.yellow');

  const purpleStyleSet = css`
    background-color: ${tailwindPurple['700']};

    h2,
    p {
      color: white;
    }

    h3 {
      color: ${tailwindYellow['500']};
    }
  `;

  const yellowStyleSet = css`
    background-color: ${tailwindYellow['500']};

    h2,
    h3,
    p {
      color: black;
    }
  `;

  const voterRegStyleSet = css`
    background-color: #000047;

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

  const styleObject = {
    PURPLE: purpleStyleSet,
    YELLOW: yellowStyleSet,
    VOTER_REGISTRATION: voterRegStyleSet,
  };

  const alignmentObject = {
    LEFT: leftAlignment,
    CENTER: centerAlignment,
  };

  const templateStyles = get(styleObject, template, 'PURPLE');
  const alignmentStyles = get(alignmentObject, alignment, 'CENTER');

  return (
    <div css={[templateStyles, alignmentStyles]}>
      <div className="max-w-3xl mx-auto p-8">
        <h3 className="text-m font-source-sans font-bold uppercase">
          {superTitle}
        </h3>

        <h2 className="text-4xl font-league-gothic font-bold uppercase">
          {title}
        </h2>

        <p className="text-lg pb-4">{content}</p>

        <PrimaryButton href={link} text={linkText} />
      </div>
    </div>
  );
};

CallToActionBlock.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CallToActionBlock;
