import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import TextContent from '../../utilities/TextContent/TextContent';

import './section-block.scss';

const SectionBlock = props => {
  const {
    backgroundColor,
    className,
    classNameByEntry,
    content,
    gridType,
    hyperlinkColor,
    id,
    textColor,
  } = props;

  const styles = {
    hyperlinkColor,
    textColor,
  };

  return (
    <section
      id={id}
      className={classnames('section-block', className)}
      style={{ backgroundColor }}
    >
      <PuckWaypoint
        name="section_block-top"
        waypointData={{ contentfulId: id }}
      />

      <TextContent
        className="section-block__content base-12-grid"
        classNameByEntry={classNameByEntry}
        styles={styles}
      >
        {content}
      </TextContent>

      <PuckWaypoint
        name="section_block-bottom"
        waypointData={{ contentfulId: id }}
      />
    </section>
  );
};

SectionBlock.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
  hyperlinkColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

SectionBlock.defaultProps = {
  backgroundColor: null,
  className: null,
  hyperlinkColor: null,
  textColor: null,
};

export default SectionBlock;
