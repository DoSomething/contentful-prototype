import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const CallToActionBlock = ({
  supertitle,
  title,
  text,
  template,
  alignment,
}) => {
  // Define a set of styles, then switch case through them?
  const tailwindPurple = tailwind('colors.purple');
  const tailwindYellow = tailwind('colors.yellow');

  // const purple = {
  //   background: "purple",
  //   supertitle: "yellow",
  //   title: "white",
  //   paragraph: "white"
  // }

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

  // Logic goes here
  // Look at Lodash get later
  let styles;
  switch (template) {
    case 'purple':
      styles = purpleStyleSet;
      break;
    case 'yellow':
      styles = yellowStyleSet;
      break;
    case 'voterReg':
      styles = voterRegStyleSet;
      break;
    default:
      styles = purpleStyleSet;
  }

  // and combine with alignment logic
  console.log(alignment);

  return (
    <div css={styles}>
      <div className="base-12-grid">
        <div className="grid-narrow my-8">
          <h3 className="text-m font-source-sans font-bold uppercase">
            {supertitle}
          </h3>
          <h2 className="text-4xl font-league-gothic font-bold uppercase">
            {title}
          </h2>
          <p className="text-lg pb-4">{text}</p>
          <button
            type="button"
            className="btn mx-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
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
  template: PropTypes.string.isRequired,
  alignment: PropTypes.oneOf(['LEFT', 'CENTER']).isRequired,
};

CallToActionBlock.defaultProps = {
  supertitle: null,
  title: null,
  text: null,
};

export default CallToActionBlock;
