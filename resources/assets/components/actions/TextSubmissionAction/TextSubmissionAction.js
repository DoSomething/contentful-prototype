import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { has, get, mapValues } from 'lodash';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import Markdown from '../../utilities/Markdown/Markdown';
import FormValidation from '../../utilities/Form/FormValidation';
import { getFieldErrors, setFormData } from '../../../helpers/forms';

class TextSubmissionAction extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      return {
        showModal: true,
        textValue: '',
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      textValue: '',
    };

    this.props.initPostSubmissionItem(this.props.id);
  }

  fields = {
    text: 'text',
  };

  handleChange = event => {
    this.setState({
      textValue: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'text';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formData = setFormData(
      {
        action,
        type,
        id: this.props.id,
        // Associate state values to fields.
        ...mapValues(this.fields, value => this.state[`${value}Value`]),
      },
      this.props,
    );

    // Send request to store the campaign text submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type,
    });
  };

  render() {
    const submissionItem = this.props.submissions.items[this.props.id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

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
              loading={submissionItem ? submissionItem.isPending : true}
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
  id: PropTypes.string.isRequired,
  initPostSubmissionItem: PropTypes.func.isRequired,
  legacyCampaignId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  legacyCampaignRunId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  textFieldLabel: PropTypes.string,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
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
