/* global FormData */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../Card';
import FormValidation from '../../utilities/Form/FormValidation';

import './text-submission-action.scss';

class TextSubmissionAction extends React.Component {
  state = {
    textValue: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('id', this.props.id);
    formData.append('action', this.props.action);
    formData.append('type', this.props.type);
    formData.append('text', this.state.textValue);

    if (this.props.legacyCampaignId && this.props.legacyCampaignRunId) {
      formData.append('details', JSON.stringify({
        campaign_id: this.props.campaignId,
        legacy_campaign_id: this.props.legacyCampaignId,
        legacy_campaign_run_id: this.props.legacyCampaignRunId,
      }));
    }

    // Send this off to the backend API to validate and send off to Rogue.
    this.props.storeCampaignPost(this.props.campaignId, formData);
  }

  handleChange = (event) => {
    this.setState({
      textValue: event.target.value,
    });
  }

  render() {
    if (this.props.submissions.items[this.props.id]) {
      console.log('🤠 we found it y\'all');
    } else {
      console.log('😡 we found NOTHING!');
    }

    const formResponse = this.props.submissions.items[this.props.id] || null;
    console.log(formResponse);

    return (
      <Card id={this.props.id} className={classnames('bordered rounded text-submission-action', this.props.className)} title={this.props.title}>

        { formResponse ? <FormValidation data={formResponse} /> : null }

        <form onSubmit={this.handleSubmit}>
          <div className="padded">
            <div className="form-item">
              <label className="field-label" htmlFor="text">{this.props.textFieldLabel}</label>
              <input
                className="text-field"
                type="text"
                id="text"
                name="text"
                placeholder={this.props.textFieldPlaceholder}
                value={this.state.textValue}
                onChange={this.handleChange}
              />
            </div>
            <p className="footnote">Your submission will be reviewed by a DoSomething.org staffer and added to our public gallery.</p>
          </div>
          <input type="submit" defaultValue={this.props.buttonText} className="button" disabled={this.props.submissions.isPending} />
        </form>
      </Card>
    );
  }
}

TextSubmissionAction.propTypes = {
  action: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  className: PropTypes.string,
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
  buttonText: 'Submit',
  className: null,
  legacyCampaignId: null,
  legacyCampaignRunId: null,
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
