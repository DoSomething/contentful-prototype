import React from 'react';
import { get, has } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import FormValidation from '../../utilities/Form/FormValidation';
import TextContent from '../../utilities/TextContent/TextContent';
import { formatFormFields, getFieldErrors } from '../../../helpers/forms';

import './petition-submission-action.scss';

class PetitionSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAffirmation: false,
      textValue: '',
    };

    // Initialize post submission item in store if it doesn't yet exist.
    if (!props.submissions.items[props.id]) {
      this.props.initPostSubmissionItem(this.props.id);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      return {
        // @TODO: change this to showModal, and display an affirmation modal in place of the success message.
        showAffirmation: true,
        textValue: '',
      };
    }

    return null;
  }

  handleChange = event => this.setState({ textValue: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const { id, actionId, storePost } = this.props;

    // Reset any straggling post submission data for this action.
    this.props.resetPostSubmissionItem(id);

    const type = 'text';

    // Send request to store the petition submission post.
    storePost({
      body: formatFormFields({
        action_id: actionId,
        text: this.state.textValue,
        type,
      }),
      type,
      actionId,
      id,
    });
  };

  render() {
    const {
      buttonText,
      content,
      id,
      informationContent,
      informationTitle,
      submissions,
      title,
      textFieldPlaceholder,
      userId,
    } = this.props;

    const submissionItem = submissions.items[id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    const FIRST_NAME_QUERY = gql`
      query AccountQuery($userId: String!) {
        user(id: $userId) {
          firstName
        }
      }
    `;

    return (
      <React.Fragment>
        <div className="petition-submission-action margin-bottom-lg" id={id}>
          <Card className="bordered rounded" title={title}>
            {this.state.showAffirmation ? (
              <p className="padded affirmation-message">
                Thanks for signing the petition!
              </p>
            ) : null}

            {formResponse ? <FormValidation response={formResponse} /> : null}
            <TextContent className="padding-md">{content}</TextContent>

            <form onSubmit={this.handleSubmit}>
              <div className="padded">
                <textarea
                  className={classnames('text-field petition-textarea', {
                    'has-error shake': has(formErrors, 'text'),
                  })}
                  placeholder={textFieldPlaceholder}
                  value={this.state.textValue}
                  onChange={this.handleChange}
                  disabled={this.state.showAffirmation}
                />
                <p className="footnote">500 character limit</p>
              </div>

              {userId ? (
                <Query
                  query={FIRST_NAME_QUERY}
                  queryName="user"
                  variables={{ userId }}
                >
                  {({ loading, data }) => {
                    let signature = get(data, 'user.firstName', 'A Doer');

                    if (loading) {
                      signature = 'Loading name...';
                    }

                    return (
                      <div className="padded">
                        <p className="petition-signature-label padding-bottom-sm">
                          Signed,
                        </p>
                        <input
                          className="text-field petition-signature"
                          type="text"
                          disabled
                          value={signature}
                        />
                      </div>
                    );
                  }}
                </Query>
              ) : null}

              <Button
                type="submit"
                attached
                loading={submissionItem ? submissionItem.isPending : true}
                disabled={this.state.showAffirmation}
              >
                {buttonText}
              </Button>
            </form>
          </Card>
        </div>

        <div className="petition-submission-information">
          <Card className="bordered rounded" title={informationTitle}>
            <TextContent className="padding-md">
              {informationContent}
            </TextContent>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

PetitionSubmissionAction.propTypes = {
  actionId: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  informationContent: PropTypes.string,
  informationTitle: PropTypes.string,
  initPostSubmissionItem: PropTypes.func.isRequired,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    items: PropTypes.object,
  }).isRequired,
  textFieldPlaceholder: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
};

PetitionSubmissionAction.defaultProps = {
  buttonText: 'Add your name',
  textFieldPlaceholder: 'Add your custom message...',
  title: 'Sign The Petition',
  informationContent:
    'Your first name and email will be added to our petition. We do not collect any additional information.',
  informationTitle: 'More Info',
  userId: null,
};

export default PetitionSubmissionAction;
