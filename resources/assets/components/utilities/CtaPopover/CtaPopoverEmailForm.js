/* Renders input field, submit button, 
analytics events, and styling related to the email input */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { trackAnalyticsEvent } from '../../../helpers/analytics';
import { link } from 'fs-extra';
import CtaPopover from '/CtaPopover.js';

const CtaPopoverEmailForm = ({
  content,
  handleSubmit,
  handleClose,
  title,
  link,
}) => {
  const handleSubmit = () =>
    trackAnalyticsEvent({
      metadata: {
        category: 'site_action',
        target: 'input',
        verb: 'submitted',
        noun: 'call_to_action',
        adjective: 'popover',
        label: 'call_to_action_popover',
      },
      context: {
        url: link,
      },
    });
  render();
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

CtaPopoverEmailForm.PropTypes = {
  content: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CtaPopoverEmailForm;
