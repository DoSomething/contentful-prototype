import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import CtaTemplate from './templates/CtaTemplate';
import DefaultTemplate from './templates/DefaultTemplate';

const templates = {
  cta: CtaTemplate,
  default: DefaultTemplate,
};

const LinkAction = props => {
  const { id, template } = props;

  const LinkActionTemplate = get(templates, template, DefaultTemplate);

  return (
    <React.Fragment>
      <PuckWaypoint
        name="link_action-top"
        waypointData={{ contentfulId: id }}
      />
      <LinkActionTemplate {...props} />
      <PuckWaypoint
        name="link_action-bottom"
        waypointData={{ contentfulId: id }}
      />
    </React.Fragment>
  );
};

LinkAction.propTypes = {
  template: PropTypes.string,
};

LinkAction.defaultProps = {
  template: null,
};

export default LinkAction;
