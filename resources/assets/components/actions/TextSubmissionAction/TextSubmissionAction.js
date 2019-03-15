import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import { withoutUndefined, withoutNulls } from '../../../helpers';
import FormValidation from '../../utilities/Form/FormValidation';
import TextContent from '../../utilities/TextContent/TextContent';
import { getFieldErrors, formatFormFields } from '../../../helpers/forms';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';

import './text-submission-action.scss';

class TextSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      textValue: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      return {
        showModal: true,
        textValue: '',
      };
    }

    return null;
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

    const formFields = withoutNulls({
      action,
      type,
      id: this.props.id,
      action_id: this.props.actionId,
      // Associate state values to fields.
      ...mapValues(this.fields, value => this.state[`${value}Value`]),
    });

    const data = {
      action,
      actionId: this.props.actionId,
      body: formatFormFields(formFields),
      id: this.props.id,
      campaignContentfulId: this.props.campaignContentfulId,
      type,
    };

    // Send request to store the text submission post.
    // (Use campaign ID independant post method if actionId is provided).
    if (this.props.actionId) {
      this.props.storePost(data);
    } else {
      this.props.storeCampaignPost(this.props.campaignId, data);
    }
  };

  render() {
    const submissionItem = this.props.submissions.items[this.props.id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    // Associate errors to component field names.
    const errors = withoutUndefined(
      formErrors
        ? mapValues(invert(this.fields), value => formErrors[value])
        : null,
    );

    return (
      <React.Fragment>
        <div
          className={classnames(
            'text-submission-action margin-bottom-lg',
            this.props.className,
          )}
          id={this.props.id}
        >
          <PuckWaypoint
            name="text_submission_action-top"
            waypointData={{ contentfulId: this.props.id }}
          />
          <Card className="bordered rounded" title={this.props.title}>
            {formResponse ? <FormValidation response={formResponse} /> : null}

            <form onSubmit={this.handleSubmit}>
              <div className="padded">
                <label
                  className={classnames('field-label', {
                    'has-error': has(errors, 'text'),
                  })}
                  htmlFor="text"
                >
                  {this.props.textFieldLabel}
                </label>
                <textarea
                  className={classnames('text-field text-submission-texarea', {
                    'has-error shake': has(errors, 'text'),
                  })}
                  id="text"
                  name="text"
                  placeholder={this.props.textFieldPlaceholder}
                  value={this.state.textValue}
                  onChange={this.handleChange}
                />
                <CharacterLimit limit={500} text={this.state.textValue} />
              </div>
              <Button
                type="submit"
                loading={submissionItem && submissionItem.isPending}
                disabled={!this.state.textValue}
                attached
              >
                {this.props.buttonText}
              </Button>
              <p className="footnote padding-horizontal-md padding-bottom-md">
                Your submission will be reviewed by a DoSomething.org staffer
                and added to our public gallery.
              </p>
            </form>
          </Card>
          <PuckWaypoint
            name="text_submission_action-bottom"
            waypointData={{ contentfulId: this.props.id }}
          />
        </div>

        {this.props.informationContent ? (
          <div
            className={classnames(
              'text-submission-information margin-bottom-lg',
              this.props.className,
            )}
          >
            <Card
              className="bordered rounded"
              title={this.props.informationTitle}
            >
              <TextContent className="padding-md">
                {this.props.informationContent}
              </TextContent>
            </Card>
          </div>
        ) : null}

        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <Card className="bordered rounded" title="We got your message!">
              <TextContent className="padded">
                {this.props.affirmationContent ||
                  TextSubmissionAction.defaultProps.affirmationContent}
              </TextContent>
            </Card>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

TextSubmissionAction.propTypes = {
  actionId: PropTypes.number,
  affirmationContent: PropTypes.string,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  campaignContentfulId: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  informationTitle: PropTypes.string,
  informationContent: PropTypes.string,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  textFieldLabel: PropTypes.string,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
};

TextSubmissionAction.defaultProps = {
  actionId: null,
  additionalContent: null,
  affirmationContent:
    "Thanks for joining the movement, and submitting your message! After we review your submission, we'll add it to the public gallery alongside submissions from all the other members taking action in this campaign.",
  buttonText: 'Submit',
  campaignId: null,
  campaignContentfulId: null,
  className: null,
  informationContent: null,
  informationTitle: 'More Info',
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
