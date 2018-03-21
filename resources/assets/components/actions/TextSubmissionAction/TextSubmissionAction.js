import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../Card';

import './text-submission-action.scss';

class TextSubmissionAction extends React.Component {
  state = {
    action: this.props.action,
    id: this.props.id,
    campaignId: this.props.campaignId,
    legacyCampaignId: this.props.legacyCampaignId,
    legacyCampaignRunId: this.props.legacyCampaignRunId,
    textValue: '',
    type: 'text',
    userId: this.props.userId,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Send this off to the backend API to validate/send to Rogue.
    // We should maybe ONLY send the data we need to pass instead of full state.
    this.props.storeCampaignPost(this.state);
  }

  handleChange = (event) => {
    this.setState({
      textValue: event.target.value,
    });
  }

  render() {
    return (
      <Card className={classnames('bordered rounded text-submission-action', this.props.className)} title={this.props.title}>
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
          <input type="submit" defaultValue={this.props.buttonText} className="button" />
        </form>
      </Card>
    );
  }
}

TextSubmissionAction.propTypes = {
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentfulId: PropTypes.string.isRequired,
  textFieldLabel: PropTypes.string,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

TextSubmissionAction.defaultProps = {
  buttonText: 'Submit',
  className: null,
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
