import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../Card';

import './text-submission-action.scss';

class TextSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitForm = this.handleSubmitForm.bind(this);

    this.state = {
      data: null, // @TODO: temporary holder; not sure what full state is yet.
    };
  }

  handleSubmitForm(event) {
    event.preventDefault();

    console.log(this.props.campaignId);
    console.log(this.props.campaignRunId);
    console.log(this.props.contentfulId);
    console.log(this.props.userId);
  }

  render() {
    return (
      <Card className={classnames('bordered rounded text-submission-action', this.props.className)} title={this.props.title}>
        <form onSubmit={this.handleSubmitForm}>
          <div className="padded">
            <div className="form-item">
              <label className="field-label" htmlFor="text">{this.props.textFieldLabel}</label>
              <input className="text-field" id="text" name="text" placeholder={this.props.textFieldPlaceholder} type="text" />
            </div>
            <p className="footnote">Your submission will be reviewed by a DoSomething.org staffer and added to our public gallery.</p>
          </div>
          <input type="submit" defaultValue={this.props.buttonText} className="button" disabled />
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
