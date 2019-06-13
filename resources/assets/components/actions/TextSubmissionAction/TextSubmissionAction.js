import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import FormValidation from '../../utilities/Form/FormValidation';
import { withoutUndefined, withoutNulls } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import { getFieldErrors, formatPostPayload } from '../../../helpers/forms';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';

import './text-submission-action.scss';

const CHARACTER_LIMIT = 500;

export const TextSubmissionBlockFragment = gql`
  fragment TextSubmissionBlockFragment on TextSubmissionBlock {
    actionId
    title
    textFieldLabel
    textFieldPlaceholder
    buttonText
    informationTitle
    informationContent
    affirmationContent
  }
`;

class TextSubmissionAction extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    console.log('👾', nextProps);
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

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      textValue: '',
    };
  }

  handleChange = event => {
    this.setState({
      textValue: event.target.value,
    });
  };

  handleFocus = () => {
    trackAnalyticsEvent({
      context: { blockId: this.props.id, pageId: this.props.pageId },
      metadata: {
        adjective: 'text',
        category: 'campaign_action',
        noun: 'text_submission_action', // @TODO: maybe set this using the formatEventNoun() helper?
        target: 'field',
        verb: 'focused',
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'text';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formFields = withoutNulls({
      action, // @TODO: deprecate
      type,
      id: this.props.id, // @TODO: rename property to blockId?
      action_id: this.props.actionId,
      // Associate state values to fields.
      ...mapValues(this.fields, value => this.state[`${value}Value`]),
    });

    const data = {
      action, // @TODO: deprecate
      actionId: this.props.actionId,
      blockId: this.props.id,
      body: formatPostPayload(formFields),
      campaignId: this.props.campaignId,
      pageId: this.props.pageId,
      type,
    };

    console.log('🔥', data);

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
            waypointData={{ blockId: this.props.id }}
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
                  onFocus={this.handleFocus}
                />
                <CharacterLimit
                  limit={CHARACTER_LIMIT}
                  text={this.state.textValue}
                />
              </div>
              <Button
                type="submit"
                loading={submissionItem && submissionItem.isPending}
                disabled={
                  !this.state.textValue ||
                  this.state.textValue.length > CHARACTER_LIMIT
                }
                attached
              >
                {this.props.buttonText}
              </Button>
              <PrivacyLanguage />
            </form>
          </Card>
          <PuckWaypoint
            name="text_submission_action-bottom"
            waypointData={{ blockId: this.props.id }}
          />
        </div>

        {this.props.informationContent ? (
          <div
            className={classnames(
              'text-submission-information',
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
  className: PropTypes.string,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  informationTitle: PropTypes.string,
  informationContent: PropTypes.string,
  pageId: PropTypes.string,
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
  className: null,
  informationContent: null,
  informationTitle: 'More Info',
  pageId: null,
  textFieldLabel: 'I did something by...',
  textFieldPlaceholder: 'Indicate what you did to make a difference.',
  title: 'Submit your text',
};

export default TextSubmissionAction;
