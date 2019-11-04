/* Renders input field, submit button, 
analytics events, and styling related to the email input */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './cta-popover.scss';
import CtaPopover from '/CtaPopover.js';
import { trackAnalyticsEvent } from '../../../helpers/analytics';

const CtaPopoverEmailForm = ({ handleSubmit, handleClose, buttonText }) => {
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
    });

  return (
    <div classname="cta-popover p-4 border rounded">
      <button
        type="button"
        classname="modal__close -white"
        onClick={handleClose}
      />
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.value}
            placeholder="Enter your email address"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

CtaPopoverEmailForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CtaPopoverEmailForm;
