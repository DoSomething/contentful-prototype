import React from 'react';
import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
import classnames from 'classnames';

const CallToActionBlock = ({ supertitle, title, text, classes }) => {
  console.log(classes);
  // Define a set of styles, then switch case through them?
  const styleSet = 1;
  let style;

  const purple = {
    background: 'bg-purple-700',
    titleColor: 'text-white',
  };

  if (styleSet === 1) {
    style = purple;
  }

  return (
    <div className={classnames('wrapper', style.background)}>
      <div className="base-12-grid">
        <div className="grid-narrow text-center my-4">
          <h3
            className="text-m font-source-sans font-bold uppercase"
            // css={css`
            //   background-color: hotpink;
            // `}
          >
            {supertitle}
          </h3>
          <h3 className="text-4xl font-league-gothic text-white font-bold uppercase">
            {title}
          </h3>
          <p className="text-white pb-4">{text}</p>
          <a
            className="btn mx-4 bg-blurple-500 text-white hover:bg-blurple-300 hover:text-white"
            href="https://google.com"
          >
            Button text
          </a>
        </div>
      </div>
    </div>
  );
};

CallToActionBlock.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.string.isRequired,
};

CallToActionBlock.defaultProps = {
  supertitle: null,
  title: null,
  text: null,
};

export default CallToActionBlock;
