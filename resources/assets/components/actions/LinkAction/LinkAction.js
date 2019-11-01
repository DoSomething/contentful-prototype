import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import CtaTemplate from './templates/CtaTemplate';
import DefaultTemplate from './templates/DefaultTemplate';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';

export const LinkBlockFragment = gql`
  fragment LinkBlockFragment on LinkBlock {
    title
    content
    link
    buttonText
    affiliateLogo {
      url(w: 200, h: 100)
      description
    }
    template
    additionalContent
  }
`;

const templates = {
  cta: CtaTemplate,
  default: DefaultTemplate,
};

const LinkAction = props => {
  const { id, template } = props;

  const LinkActionTemplate = get(templates, template, DefaultTemplate);

  return (
    <React.Fragment>
      <AnalyticsWaypoint name="link_action-top" context={{ blockId: id }} />
      <LinkActionTemplate {...props} />
      <AnalyticsWaypoint name="link_action-bottom" context={{ blockId: id }} />
    </React.Fragment>
  );
};

LinkAction.propTypes = {
  id: PropTypes.string.isRequired,
  template: PropTypes.string,
};

LinkAction.defaultProps = {
  template: null,
};

export default LinkAction;
