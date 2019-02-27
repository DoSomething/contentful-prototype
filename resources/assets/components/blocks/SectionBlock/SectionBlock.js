import React from 'react';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';

const SectionBlock = props => {
  const { id, content, backgroundColor, textColor } = props;

  const styles = {
    backgroundColor,
    color: textColor,
  };

  return (
    <section id={id} className="story-section" style={withoutNulls(styles)}>
      <TextContent>{content}</TextContent>
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
