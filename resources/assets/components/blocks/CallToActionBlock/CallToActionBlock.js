import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const CallToActionBlock = ({ supertitle, title, text, template }) => {
  // Define a set of styles, then switch case through them?
  const tailwindGray = tailwind('colors.gray');
  const tailwindPurple = tailwind('colors.purple');
  const tailwindYellow = tailwind('colors.yellow');
  const tailwindBlurple = tailwind('colors.blurple');

  const centerPurpleStyleSet = css`
    background-color: ${tailwindPurple['500']};
    text-align: center;

    h2 {
      color: ${tailwindYellow['500']};
    }

    h3 {
      color: white;
    }

    p {
      color: white;
    }
  `;

  const centerBlueStyleSet = css`
    background-color: ${tailwindBlurple['500']};
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

  const leftYellowStyleSet = css`
    background-color: ${tailwindYellow['500']};
    text-align: left;

    h2 {
      color: ${tailwindGray['900']};
    }
  `;

  // Logic goes here
  let styles;
  switch (template.template) {
    case 1:
      styles = centerPurpleStyleSet;
      break;
    case 2:
      styles = leftYellowStyleSet;
      break;
    case 3:
      styles = centerBlueStyleSet;
      break;
    default:
      styles = centerPurpleStyleSet;
  }

  return (
    <div css={styles}>
      <div className="base-12-grid">
        <div className="grid-narrow my-4">
          <h3 className="text-m font-source-sans font-bold uppercase">
            {supertitle}
          </h3>
          <h2 className="text-4xl font-league-gothic font-bold uppercase">
            {title}
          </h2>
          <p className="text-lg pb-4">{text}</p>
          <button
            type="button"
            className="btn mx-4 mb-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
          >
            Button text
          </button>
        </div>
      </div>
    </div>
  );
};

CallToActionBlock.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  template: PropTypes.number.isRequired,
};

CallToActionBlock.defaultProps = {
  supertitle: null,
  title: null,
  text: null,
};

export default CallToActionBlock;
