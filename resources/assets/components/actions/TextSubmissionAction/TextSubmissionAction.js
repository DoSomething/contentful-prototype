/* global FormData */

import React from 'react';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Markdown from '../../Markdown';
import Button from '../../Button/Button';
import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import { getFieldErrors } from '../../../helpers/forms';
import FormValidation from '../../utilities/Form/FormValidation';

class TextSubmissionAction extends React.Component {
  state = {
    showModal: false,
    textValue: '',
  };

  componentDidUpdate = prevProps => {
    const prevResponse = prevProps.submissions.items[this.props.id] || null;
    const response = this.props.submissions.items[this.props.id] || null;

    // If prior response had no success status, but current response does, then
    // the submission was successful!
    if (
      !has(prevResponse, 'status.success') &&
      has(response, 'status.success')
    ) {
      this.resetForm();

      this.setState({
        showModal: true,
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.clearPostSubmissionItem(this.props.id);

    const action = get(this.props.additionalContent, 'action', 'default');

    const formData = new FormData();

    formData.append('id', this.props.id);
    formData.append('action', action);
    formData.append('type', this.props.type);
    formData.append('text', this.state.textValue);

    if (this.props.legacyCampaignId && this.props.legacyCampaignRunId) {
      formData.append(
        'details',
        JSON.stringify({
          campaign_id: this.props.campaignId,
          legacy_campaign_id: this.props.legacyCampaignId,
          legacy_campaign_run_id: this.props.legacyCampaignRunId,
        }),
      );
    }

    // Send request to store the campaign text submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type: this.props.type,
    });
  };

  handleChange = event => {
    this.setState({
      textValue: event.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      textValue: '',
    });
  };

  render() {
    const formResponse = this.props.submissions.items[this.props.id] || null;

    const errors = getFieldErrors(formResponse);

    return (
      <React.Fragment>
        <Card
          id={this.props.id}
          className={classnames(
            'bordered rounded text-submission-action',
            this.props.className,
          )}
          title={this.props.title}
        >
          {formResponse ? <FormValidation response={formResponse} /> : null}

          <form onSubmit={this.handleSubmit}>
            <div className="padded">
              <div className="form-item">
                <label
                  className={classnames('field-label', {
                    'has-error': has(errors, 'text'),
                  })}
                  htmlFor="text"
                >
                  {this.props.textFieldLabel}
                </label>
                <input
                  className={classnames('text-field', {
                    'has-error shake': has(errors, 'text'),
                  })}
                  type="text"
                  id="text"
                  name="text"
                  placeholder={this.props.textFieldPlaceholder}
                  value={this.state.textValue}
                  onChange={this.handleChange}
                />
              </div>
              <p className="footnote">
                Your submission will be reviewed by a DoSomething.org staffer
                and added to our public gallery.
              </p>
            </div>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              disabled={this.props.submissions.isPending}
              attached
            >
              {this.props.buttonText}
            </Button>
          </form>
        </Card>

        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <Card className="bordered rounded" title="We got your message!">
              <Markdown className="padded">
                {this.props.affirmationContent ||
                  TextSubmissionAction.defaultProps.affirmationContent}
              </Markdown>
            </Card>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

TextSubmissionAction.propTypes = {
  affirmationContent: PropTypes.string,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  className: PropTypes.string,
  clearPostSubmissionItem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  legacyCampaignId: PropTypes.string,
  legacyCampaignRunId: PropTypes.string,
  storeCampaignPost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  textFieldLabel: PropTypes.string,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

TextSubmissionAction.defaultProps = {
  additionalContent: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your message! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit',
  className: null,
  legacyCampaignId: null,
  legacyCampaignRunId: null,
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
