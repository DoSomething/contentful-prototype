import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers/display';

const MemberSpotlight = ({
  age,
  campaignTitle,
  colors,
  content,
  firstName,
  image,
  memberQuote,
  scholarshipAmount,
}) => {
  return (
    <article
      className="flex flex-col h-full relative text-center text-white bg-transparent"
      css={css`
        padding-top: 125px;
      `}
    >
      <img
        className="absolute rounded-full top-0"
        css={css`
          height: 250px;
          left: 50%;
          transform: translate(-50%);
          width: 250px;
        `}
        src={image.url}
        alt="DoSomething member"
      />

      <div
        className="bg-orange-300 flex flex-col flex-grow px-4 pb-6 rounded"
        css={css`
          padding-top: 141px;
        `}
        style={{
          backgroundColor: colors.background || tailwind('colors.blurple.500'),
        }}
      >
        <h2
          className="font-league-gothic font-normal mb-0 text-5xl uppercase"
          style={{ color: colors.title || tailwind('colors.white') }}
        >
          {firstName}
          {age ? `, ${age}` : null}
        </h2>

        <p className="mt-2 text-lg text-white">
          Campaign: <span className="font-bold">{campaignTitle}</span>
        </p>

        {scholarshipAmount ? (
          <p className="mt-1 text-lg text-white">
            Amount:{' '}
            <span className="font-bold">
              ${scholarshipAmount.toLocaleString()}
            </span>
          </p>
        ) : null}

        <p className="mt-6 italic text-normal text-white">{content}</p>

        <blockquote className="mt-6 italic">
          &ldquo;{memberQuote}&rdquo;
        </blockquote>
      </div>
    </article>
  );
};

MemberSpotlight.propTypes = {
  age: PropTypes.number,
  campaignTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  colors: PropTypes.shape({
    background: PropTypes.string,
    title: PropTypes.string,
  }),
  firstName: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  memberQuote: PropTypes.string,
  scholarshipAmount: PropTypes.number,
};

MemberSpotlight.defaultProps = {
  age: null,
  colors: {},
  memberQuote: null,
  scholarshipAmount: null,
};

export default MemberSpotlight;
