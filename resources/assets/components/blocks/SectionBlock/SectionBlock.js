import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withoutNulls } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';

import './section-block.scss';

const SectionBlock = props => {
  const { backgroundColor, className, content, id, textColor } = props;

  return (
    <section
      id={id}
      className={classnames('section-block', className)}
      style={withoutNulls({ backgroundColor })}
    >
      <TextContent
        className="section-block__content base-16-grid"
        styles={withoutNulls({ color: textColor })}
      >
        {content}
      </TextContent>
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
