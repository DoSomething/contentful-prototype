import React from 'react';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';

import './section-block.scss';

const SectionBlock = props => {
  const { id, content, backgroundColor, textColor } = props;

  const styles = {
    backgroundColor,
    color: textColor,
  };

  return (
    <section
      id={id}
      className="section-block story-section base-16-grid"
      style={withoutNulls(styles)}
    >
      <div className="wrapper">
        <TextContent className="section-block__content" styles={styles}>
          {content}
        </TextContent>
      </div>
    </section>
  );
};

SectionBlock.propTypes = {
  backgroundColor: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

SectionBlock.defaultProps = {
  backgroundColor: null,
  textColor: null,
};

export default SectionBlock;
