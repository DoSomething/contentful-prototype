import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { PuckWaypoint } from '@dosomething/puck-client';

import CtaTemplate from './templates/CtaTemplate';
import DefaultTemplate from './templates/DefaultTemplate';

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
      <PuckWaypoint name="link_action-top" waypointData={{ blockId: id }} />
      <LinkActionTemplate {...props} />
      <PuckWaypoint name="link_action-bottom" waypointData={{ blockId: id }} />
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
