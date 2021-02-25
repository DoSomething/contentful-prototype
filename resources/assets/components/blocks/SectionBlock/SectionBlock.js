import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextContent from '../../utilities/TextContent/TextContent';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';

import './section-block.scss';

export const SectionBlockFragment = gql`
  fragment SectionBlockFragment on SectionBlock {
    id
    backgroundColor
    textColor
    content
  }
`;

const SectionBlock = props => {
  const {
    backgroundColor,
    className,
    classNameByEntry,
    classNameByEntryDefault,
    content,
    customProps,
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
      <AnalyticsWaypoint name="section_block-top" context={{ blockId: id }} />

      <TextContent
        className="section-block__content base-12-grid py-3 md:py-6"
        classNameByEntry={classNameByEntry}
        classNameByEntryDefault={classNameByEntryDefault}
        customProps={customProps}
        styles={styles}
      >
        {content}
      </TextContent>

      <AnalyticsWaypoint
        name="section_block-bottom"
        context={{ blockId: id }}
      />
    </section>
  );
};

SectionBlock.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  classNameByEntry: PropTypes.object,
  classNameByEntryDefault: PropTypes.string,
  customProps: PropTypes.object,
  content: PropTypes.object.isRequired,
  hyperlinkColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

SectionBlock.defaultProps = {
  backgroundColor: null,
  className: null,
  classNameByEntry: {},
  classNameByEntryDefault: null,
  customProps: {},
  hyperlinkColor: null,
  textColor: null,
};

export default SectionBlock;
